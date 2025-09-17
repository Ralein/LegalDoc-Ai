"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"
import type { DocumentTemplate, TemplateField } from "@/lib/templates"
import { documentStore } from "@/lib/document-store"

interface TemplateFormProps {
  template: DocumentTemplate
  onSubmit: (data: Record<string, string>) => void
  onCancel: () => void
}

export function TemplateForm({ template, onSubmit, onCancel }: TemplateFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    template.fields.forEach((field) => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const dataWithDate = {
        ...formData,
        current_date: new Date().toLocaleDateString("en-IN"),
      }

      const document = documentStore.createDocument(
        formData.title || `${template.name} - ${new Date().toLocaleDateString()}`,
        template.id as "fir" | "charge-sheet" | "investigation-report",
        dataWithDate,
      )

      onSubmit(dataWithDate)

      router.push(`/editor?id=${document.id}`)
    } catch (error) {
      console.error("Error creating document:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    const dataWithDate = {
      ...formData,
      current_date: new Date().toLocaleDateString("en-IN"),
    }

    const document = documentStore.createDocument(
      (formData.title || `${template.name} Draft`) + " - Draft",
      template.id as "fir" | "charge-sheet" | "investigation-report",
      dataWithDate,
    )

    router.push(`/editor?id=${document.id}`)
  }

  const renderField = (field: TemplateField) => {
    const hasError = !!errors[field.id]
    const value = formData[field.id] || ""

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={hasError ? "border-destructive" : ""}
              rows={4}
            />
            {hasError && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </Label>
            <Select value={value} onValueChange={(value) => handleFieldChange(field.id, value)}>
              <SelectTrigger className={hasError ? "border-destructive" : ""}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={hasError ? "border-destructive" : ""}
            />
            {hasError && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )
    }
  }

  const requiredFields = template.fields.filter((f) => f.required).length
  const completedFields = template.fields.filter((f) => f.required && formData[f.id]?.trim()).length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{template.name}</CardTitle>
            <CardDescription className="mt-2">{template.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              {completedFields}/{requiredFields} required fields completed
            </div>
            <div className="w-32 bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(completedFields / requiredFields) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{template.fields.map(renderField)}</div>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handleSaveDraft} disabled={isSubmitting}>
                Save Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Generate Document"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
