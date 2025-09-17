export interface Document {
  id: string
  title: string
  type: "fir" | "charge-sheet" | "investigation-report"
  status: "draft" | "completed" | "review"
  content: string
  fields: Record<string, string>
  createdAt: Date
  updatedAt: Date
  version: number
  versions: DocumentVersion[]
}

export interface DocumentVersion {
  id: string
  version: number
  content: string
  fields: Record<string, string>
  createdAt: Date
  changes: string
}

export interface DocumentStats {
  total: number
  inProgress: number
  completed: number
  templatesUsed: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: "created" | "updated" | "completed" | "exported"
  documentId: string
  documentTitle: string
  timestamp: Date
  description: string
}

class DocumentStore {
  private documents: Document[] = []
  private activities: ActivityItem[] = []

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("legaldoc-documents")
      if (stored) {
        const data = JSON.parse(stored)
        this.documents =
          data.documents?.map((doc: any) => ({
            ...doc,
            createdAt: new Date(doc.createdAt),
            updatedAt: new Date(doc.updatedAt),
            versions:
              doc.versions?.map((v: any) => ({
                ...v,
                createdAt: new Date(v.createdAt),
              })) || [],
          })) || []
        this.activities =
          data.activities?.map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp),
          })) || []
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "legaldoc-documents",
        JSON.stringify({
          documents: this.documents,
          activities: this.activities,
        }),
      )
    }
  }

  createDocument(title: string, type: Document["type"], fields: Record<string, string> = {}): Document {
    const doc: Document = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      type,
      status: "draft",
      content: "",
      fields,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      versions: [],
    }

    this.documents.push(doc)
    this.addActivity("created", doc.id, doc.title, `Created new ${type.replace("-", " ")}`)
    this.saveToStorage()
    return doc
  }

  updateDocument(id: string, updates: Partial<Document>, changes?: string): Document | null {
    const docIndex = this.documents.findIndex((doc) => doc.id === id)
    if (docIndex === -1) return null

    const doc = this.documents[docIndex]

    // Create version before updating
    if (changes) {
      const version: DocumentVersion = {
        id: `ver_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        version: doc.version,
        content: doc.content,
        fields: { ...doc.fields },
        createdAt: new Date(),
        changes,
      }
      doc.versions.push(version)
    }

    // Update document
    this.documents[docIndex] = {
      ...doc,
      ...updates,
      updatedAt: new Date(),
      version: doc.version + (changes ? 1 : 0),
    }

    this.addActivity("updated", id, doc.title, changes || "Document updated")
    this.saveToStorage()
    return this.documents[docIndex]
  }

  getDocument(id: string): Document | null {
    return this.documents.find((doc) => doc.id === id) || null
  }

  getAllDocuments(): Document[] {
    return [...this.documents].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }

  deleteDocument(id: string): boolean {
    const docIndex = this.documents.findIndex((doc) => doc.id === id)
    if (docIndex === -1) return false

    const doc = this.documents[docIndex]
    this.documents.splice(docIndex, 1)
    this.addActivity("created", id, doc.title, "Document deleted")
    this.saveToStorage()
    return true
  }

  getStats(): DocumentStats {
    const total = this.documents.length
    const inProgress = this.documents.filter((doc) => doc.status === "draft" || doc.status === "review").length
    const completed = this.documents.filter((doc) => doc.status === "completed").length
    const templatesUsed = new Set(this.documents.map((doc) => doc.type)).size

    return {
      total,
      inProgress,
      completed,
      templatesUsed,
      recentActivity: this.activities.slice(0, 10),
    }
  }

  searchDocuments(query: string): Document[] {
    const lowercaseQuery = query.toLowerCase()
    return this.documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.content.toLowerCase().includes(lowercaseQuery) ||
        Object.values(doc.fields).some((field) => field.toLowerCase().includes(lowercaseQuery)),
    )
  }

  private addActivity(type: ActivityItem["type"], documentId: string, documentTitle: string, description: string) {
    const activity: ActivityItem = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      documentId,
      documentTitle,
      timestamp: new Date(),
      description,
    }

    this.activities.unshift(activity)
    // Keep only last 50 activities
    if (this.activities.length > 50) {
      this.activities = this.activities.slice(0, 50)
    }
  }

  restoreVersion(documentId: string, versionId: string): Document | null {
    const doc = this.getDocument(documentId)
    if (!doc) return null

    const version = doc.versions.find((v) => v.id === versionId)
    if (!version) return null

    return this.updateDocument(
      documentId,
      {
        content: version.content,
        fields: version.fields,
      },
      `Restored to version ${version.version}`,
    )
  }

  exportDocument(id: string, format: "docx" | "pdf"): boolean {
    const doc = this.getDocument(id)
    if (!doc) return false

    this.addActivity("exported", id, doc.title, `Exported as ${format.toUpperCase()}`)
    this.saveToStorage()

    // In a real app, this would trigger actual export
    console.log(`Exporting document ${doc.title} as ${format}`)
    return true
  }
}

export const documentStore = new DocumentStore()
