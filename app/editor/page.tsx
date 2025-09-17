"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { RichTextEditor } from "@/components/rich-text-editor"
import { TemplateForm } from "@/components/template-form"
import { DocumentValidator } from "@/components/document-validator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getTemplate } from "@/lib/templates"
import { Save, Download, FileText, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

function EditorContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const [currentStep, setCurrentStep] = useState<"form" | "editor">("form")
  const [documentContent, setDocumentContent] = useState("")
  const [documentTitle, setDocumentTitle] = useState("Untitled Document")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const template = templateId ? getTemplate(templateId) : null

  useEffect(() => {
    if (template) {
      setDocumentTitle(`New ${template.name}`)
    }
  }, [template])

  const handleTemplateSubmit = (formData: Record<string, string>) => {
    if (!template) return

    // Replace placeholders in template content with form data
    let content = template.content
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      content = content.replace(new RegExp(placeholder, "g"), value || "[Not provided]")
    })

    setDocumentContent(content)
    setCurrentStep("editor")
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    setLastSaved(new Date())
    console.log("Document saved:", { title: documentTitle, content: documentContent })
  }

  const handleExport = (format: "pdf" | "docx") => {
    // In a real app, this would trigger actual export
    console.log(`Exporting as ${format}:`, { title: documentTitle, content: documentContent })
  }

  if (!template && templateId) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <DashboardHeader />
          <main className="p-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Template Not Found</h3>
                  <p className="text-muted-foreground mb-4">The requested template could not be found.</p>
                  <Button asChild>
                    <Link href="/templates">Browse Templates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/templates">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{documentTitle}</h1>
                <div className="flex items-center gap-4 mt-1">
                  {template && (
                    <Badge variant="secondary" className="text-xs">
                      {template.name}
                    </Badge>
                  )}
                  {lastSaved && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Saved {lastSaved.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {currentStep === "editor" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => handleExport("pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={() => handleExport("docx")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Word
                </Button>
              </div>
            )}
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "form" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className={currentStep === "form" ? "font-medium" : "text-muted-foreground"}>Fill Template</span>
            </div>
            <Separator orientation="horizontal" className="w-8" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "editor" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={currentStep === "editor" ? "font-medium" : "text-muted-foreground"}>Edit Document</span>
            </div>
          </div>

          {/* Content */}
          {currentStep === "form" && template ? (
            <TemplateForm template={template} onSubmit={handleTemplateSubmit} onCancel={() => window.history.back()} />
          ) : currentStep === "editor" ? (
            <>
              <RichTextEditor
                content={documentContent}
                onChange={setDocumentContent}
                onTitleChange={setDocumentTitle}
                title={documentTitle}
              />
              <DocumentValidator
                content={documentContent}
                title={documentTitle}
                templateType={templateId || "default"}
              />
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Creating</h3>
                  <p className="text-muted-foreground mb-4">Choose a template to get started with your document.</p>
                  <Button asChild>
                    <Link href="/templates">Browse Templates</Link>
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

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorContent />
    </Suspense>
  )
}
