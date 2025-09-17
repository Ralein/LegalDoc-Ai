"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  FileText,
  Calendar,
  User,
  MoreVertical,
  Edit3,
  Download,
  Trash2,
  Copy,
  Archive,
  Clock,
  Tag,
  SortAsc,
  SortDesc,
} from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  title: string
  type: string
  status: "draft" | "completed" | "review" | "archived"
  createdAt: Date
  updatedAt: Date
  author: string
  caseId?: string
  tags: string[]
  size: string
  versions: number
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "FIR - Theft Case #2024-001",
    type: "FIR",
    status: "completed",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    author: "Inspector Kumar",
    caseId: "FIR/2024/001",
    tags: ["theft", "property", "urgent"],
    size: "2.3 KB",
    versions: 3,
  },
  {
    id: "2",
    title: "Charge Sheet - Assault Case",
    type: "Charge Sheet",
    status: "review",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-14"),
    author: "SI Sharma",
    caseId: "CC/2024/045",
    tags: ["assault", "ipc-323", "court"],
    size: "4.1 KB",
    versions: 2,
  },
  {
    id: "3",
    title: "Investigation Report - Missing Person",
    type: "Investigation Report",
    status: "draft",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-12"),
    author: "Inspector Patel",
    caseId: "MP/2024/012",
    tags: ["missing-person", "investigation", "ongoing"],
    size: "6.7 KB",
    versions: 5,
  },
  {
    id: "4",
    title: "Bail Application - Drug Case",
    type: "Bail Application",
    status: "completed",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-06"),
    author: "Advocate Singh",
    caseId: "NDPS/2024/008",
    tags: ["bail", "ndps", "court"],
    size: "3.2 KB",
    versions: 1,
  },
  {
    id: "5",
    title: "Witness Statement - Road Accident",
    type: "Witness Statement",
    status: "completed",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
    author: "Constable Yadav",
    caseId: "ACC/2024/023",
    tags: ["accident", "witness", "traffic"],
    size: "1.8 KB",
    versions: 1,
  },
  {
    id: "6",
    title: "Search Warrant Application",
    type: "Search Warrant",
    status: "archived",
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2023-12-29"),
    author: "Inspector Kumar",
    caseId: "SW/2023/156",
    tags: ["search", "warrant", "drugs"],
    size: "2.9 KB",
    versions: 2,
  },
]

const statusColors = {
  draft: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  review: "bg-orange-100 text-orange-800",
  archived: "bg-gray-100 text-gray-800",
}

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("updated")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const filteredDocuments = mockDocuments
    .filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.caseId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || doc.status === statusFilter
      const matchesType = typeFilter === "all" || doc.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "created":
          aValue = a.createdAt
          bValue = b.createdAt
          break
        case "updated":
          aValue = a.updatedAt
          bValue = b.updatedAt
          break
        case "author":
          aValue = a.author
          bValue = b.author
          break
        default:
          aValue = a.updatedAt
          bValue = b.updatedAt
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const documentTypes = [...new Set(mockDocuments.map((doc) => doc.type))]
  const allTags = [...new Set(mockDocuments.flatMap((doc) => doc.tags))]

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments((prev) => (prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on documents:`, selectedDocuments)
    setSelectedDocuments([])
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Document Archive</h1>
              <p className="text-muted-foreground text-lg">
                Manage and search through your legal documents ({filteredDocuments.length} documents)
              </p>
            </div>
            <Button asChild>
              <Link href="/templates">
                <FileText className="h-4 w-4 mr-2" />
                New Document
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, case ID, tags, or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated">Updated</SelectItem>
                      <SelectItem value="created">Created</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedDocuments.length > 0 && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedDocuments.length} documents selected</span>
                  <div className="flex gap-2 ml-auto">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("download")}>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")}>
                      <Archive className="h-3 w-3 mr-1" />
                      Archive
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents List */}
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleSelectDocument(doc.id)}
                        className="rounded border-border"
                      />

                      {/* Document Icon */}
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{doc.title}</h3>
                          <Badge className={statusColors[doc.status]}>{doc.status}</Badge>
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {doc.author}
                          </div>
                          {doc.caseId && (
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {doc.caseId}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {doc.updatedAt.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {doc.versions} versions
                          </div>
                          <span>{doc.size}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-1 mt-2">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{doc.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/editor?document=${doc.id}`}>
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Link>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Word
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2" />
                              Version History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(doc.id)}
                            onChange={() => handleSelectDocument(doc.id)}
                            className="rounded border-border"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-base line-clamp-2">{doc.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={statusColors[doc.status]}>{doc.status}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {doc.author}
                        </div>
                        {doc.caseId && (
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {doc.caseId}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {doc.updatedAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {doc.versions} versions
                          </div>
                          <span>{doc.size}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <Button size="sm" className="w-full mt-4" asChild>
                        <Link href={`/editor?document=${doc.id}`}>
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Start creating documents to see them here"}
                  </p>
                  <Button asChild>
                    <Link href="/templates">Create New Document</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
