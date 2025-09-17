"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationRule {
  id: string
  label: string
  description: string
  required: boolean
  pattern?: RegExp
  keywords?: string[]
}

interface ValidationResult {
  rule: ValidationRule
  passed: boolean
  message: string
  suggestions?: string[]
}

interface DocumentValidatorProps {
  content: string
  title: string
  templateType?: string
}

const validationRules: Record<string, ValidationRule[]> = {
  fir: [
    {
      id: "complainant_name",
      label: "Complainant Name",
      description: "Document must contain complainant's name",
      required: true,
      keywords: ["complainant", "name"],
    },
    {
      id: "date_time",
      label: "Date and Time",
      description: "Incident date and time must be specified",
      required: true,
      keywords: ["date", "time", "occurred", "happened"],
    },
    {
      id: "location",
      label: "Location Details",
      description: "Place of incident must be mentioned",
      required: true,
      keywords: ["place", "location", "address", "occurred at"],
    },
    {
      id: "incident_details",
      label: "Incident Description",
      description: "Detailed description of the incident",
      required: true,
      keywords: ["incident", "details", "what happened", "description"],
    },
    {
      id: "police_station",
      label: "Police Station",
      description: "Police station name must be mentioned",
      required: true,
      keywords: ["police station", "station"],
    },
  ],
  "charge-sheet": [
    {
      id: "accused_name",
      label: "Accused Details",
      description: "Name and details of accused person(s)",
      required: true,
      keywords: ["accused", "defendant", "name"],
    },
    {
      id: "charges",
      label: "Legal Charges",
      description: "Specific charges and IPC sections",
      required: true,
      keywords: ["section", "ipc", "charges", "under"],
    },
    {
      id: "evidence",
      label: "Evidence Summary",
      description: "Summary of evidence collected",
      required: true,
      keywords: ["evidence", "proof", "witness", "material"],
    },
    {
      id: "court_name",
      label: "Court Details",
      description: "Name of the court",
      required: true,
      keywords: ["court", "honorable", "magistrate"],
    },
  ],
  default: [
    {
      id: "title_present",
      label: "Document Title",
      description: "Document should have a clear title",
      required: true,
      keywords: ["title", "heading"],
    },
    {
      id: "date_present",
      label: "Date",
      description: "Document should contain a date",
      required: true,
      pattern:
        /\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}|\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{2,4}/i,
    },
    {
      id: "signature_line",
      label: "Signature Line",
      description: "Document should have signature lines",
      required: false,
      keywords: ["signature", "signed", "sign"],
    },
  ],
}

export function DocumentValidator({ content, title, templateType = "default" }: DocumentValidatorProps) {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    validateDocument()
  }, [content, title, templateType])

  const validateDocument = () => {
    const rules = validationRules[templateType] || validationRules.default
    const fullText = `${title} ${content}`.toLowerCase()

    const results: ValidationResult[] = rules.map((rule) => {
      let passed = false
      let message = ""
      const suggestions: string[] = []

      if (rule.pattern) {
        passed = rule.pattern.test(fullText)
        message = passed ? "Pattern found" : "Required pattern not found"
      } else if (rule.keywords) {
        const foundKeywords = rule.keywords.filter((keyword) => fullText.includes(keyword.toLowerCase()))
        passed = foundKeywords.length > 0

        if (passed) {
          message = `Found: ${foundKeywords.join(", ")}`
        } else {
          message = `Missing keywords: ${rule.keywords.join(", ")}`
          suggestions.push(`Add ${rule.keywords[0]} information`)
        }
      }

      if (!passed && rule.required) {
        suggestions.push(`This field is required for ${templateType} documents`)
      }

      return {
        rule,
        passed,
        message,
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      }
    })

    setValidationResults(results)
  }

  const requiredIssues = validationResults.filter((r) => !r.passed && r.rule.required).length
  const totalRequired = validationResults.filter((r) => r.rule.required).length
  const completionRate = totalRequired > 0 ? ((totalRequired - requiredIssues) / totalRequired) * 100 : 100

  if (!isVisible) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsVisible(true)} className="fixed bottom-4 right-4 z-40">
        <Eye className="h-4 w-4 mr-2" />
        Show Validator
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-40 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Document Validator
            </CardTitle>
            <CardDescription>
              {requiredIssues === 0 ? "All required fields complete" : `${requiredIssues} issues found`}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all",
                completionRate === 100 ? "bg-green-500" : completionRate >= 70 ? "bg-yellow-500" : "bg-red-500",
              )}
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-64 overflow-y-auto">
        {validationResults.map((result) => (
          <div key={result.rule.id} className="space-y-2">
            <div className="flex items-start gap-2">
              {result.passed ? (
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              ) : result.rule.required ? (
                <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{result.rule.label}</span>
                  {result.rule.required && (
                    <Badge variant="destructive" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{result.message}</p>
                {result.suggestions && (
                  <div className="mt-1">
                    {result.suggestions.map((suggestion, index) => (
                      <p key={index} className="text-xs text-blue-600">
                        💡 {suggestion}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {validationResults.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No validation rules defined</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
