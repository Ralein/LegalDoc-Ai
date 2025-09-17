"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw,
  Expand,
  Shrink,
  Wand2,
  Languages,
  FileText,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { textProcessor, type TextProcessingResponse } from "@/lib/text-processor"
import { useLanguage } from "@/lib/language-context"

interface AIToolbarProps {
  selectedText: string
  onApplySuggestion: (newText: string) => void
  onClose: () => void
}

export function AIToolbar({ selectedText, onApplySuggestion, onClose }: AIToolbarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<TextProcessingResponse[]>([])
  const [activeType, setActiveType] = useState<string | null>(null)
  const { language, t } = useLanguage()

  const aiTools = [
    {
      type: "grammar" as const,
      label: t("ai.grammarFix"),
      icon: CheckCircle,
      description: "Fix grammar and spelling errors",
      color: "text-green-600",
    },
    {
      type: "concise" as const,
      label: t("ai.concise"),
      icon: Shrink,
      description: "Shorten while keeping meaning",
      color: "text-blue-600",
    },
    {
      type: "elaborate" as const,
      label: t("ai.elaborate"),
      icon: Expand,
      description: "Add more detail and context",
      color: "text-purple-600",
    },
    {
      type: "rephrase" as const,
      label: t("ai.rephrase"),
      icon: RotateCcw,
      description: "Rewrite in different words",
      color: "text-orange-600",
    },
    {
      type: "translate" as const,
      label: "Translate",
      icon: Languages,
      description: "Add Tamil translations",
      color: "text-indigo-600",
    },
    {
      type: "summarize" as const,
      label: t("ai.summarize"),
      icon: FileText,
      description: "Create a brief summary",
      color: "text-pink-600",
    },
  ]

  const generateTextSuggestion = async (type: TextProcessingResponse["type"]) => {
    setIsLoading(true)
    setActiveType(type)

    try {
      // Simulate processing delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      const response = textProcessor.processText({
        text: selectedText,
        type,
        context: "legal document",
        language: language === "tamil" ? "tamil" : "english",
      })

      setSuggestions((prev) => {
        const filtered = prev.filter((s) => s.original !== selectedText || s.explanation !== response.explanation)
        return [...filtered, response]
      })
    } catch (error) {
      console.error("Text processing error:", error)
    } finally {
      setIsLoading(false)
      setActiveType(null)
    }
  }

  const generateAllSuggestions = async () => {
    setIsLoading(true)
    setActiveType("batch")

    try {
      const responses: TextProcessingResponse[] = []

      // Process each tool type sequentially
      for (const tool of aiTools.slice(0, 4)) {
        await new Promise((resolve) => setTimeout(resolve, 200)) // Small delay between each
        const response = textProcessor.processText({
          text: selectedText,
          type: tool.type,
          context: "legal document",
          language: language === "tamil" ? "tamil" : "english",
        })
        responses.push(response)
      }

      setSuggestions(responses)
    } catch (error) {
      console.error("Batch text processing error:", error)
    } finally {
      setIsLoading(false)
      setActiveType(null)
    }
  }

  const applySuggestion = (suggestion: TextProcessingResponse) => {
    onApplySuggestion(suggestion.suggestion)
    onClose()
  }

  return (
    <Card className="w-96 shadow-lg border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{t("ai.suggestions")}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Selected: "{selectedText.slice(0, 50)}
          {selectedText.length > 50 ? "..." : ""}"
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button variant="default" size="sm" onClick={generateAllSuggestions} disabled={isLoading} className="flex-1">
            {isLoading && activeType === "batch" ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Get All Suggestions
          </Button>
        </div>

        <Separator />

        {/* Text Processing Tools */}
        <div className="grid grid-cols-2 gap-2">
          {aiTools.map((tool) => (
            <Button
              key={tool.type}
              variant="outline"
              size="sm"
              onClick={() => generateTextSuggestion(tool.type)}
              disabled={isLoading}
              className="h-auto p-3 flex flex-col items-start gap-1"
            >
              <div className="flex items-center gap-2 w-full">
                <tool.icon className={cn("h-4 w-4", tool.color)} />
                <span className="text-xs font-medium">{tool.label}</span>
                {isLoading && activeType === tool.type && <Loader2 className="h-3 w-3 animate-spin ml-auto" />}
              </div>
              <span className="text-xs text-muted-foreground text-left">{tool.description}</span>
            </Button>
          ))}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Text Suggestions</h4>
              {suggestions.map((suggestion, index) => (
                <div key={`${suggestion.explanation}-${index}`} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {aiTools.find((t) => t.type === suggestion.type)?.label || "Text"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{suggestion.explanation}</span>
                    <div className="ml-auto flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">{Math.round(suggestion.confidence * 100)}%</span>
                      <Progress value={suggestion.confidence * 100} className="w-8 h-1" />
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md text-sm max-h-32 overflow-y-auto">
                    {suggestion.suggestion}
                  </div>
                  {suggestion.changes.length > 0 && (
                    <div className="text-xs text-muted-foreground">Changes: {suggestion.changes.join(", ")}</div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => applySuggestion(suggestion)}>
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSuggestions((prev) => prev.filter((s) => s !== suggestion))}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Additional Features */}
        <Separator />
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Smart Features</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start bg-transparent"
              onClick={() => generateTextSuggestion("summarize")}
              disabled={isLoading}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Auto-Summarize Selection
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start bg-transparent"
              onClick={() => generateTextSuggestion("grammar")}
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Check Legal Terminology
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
