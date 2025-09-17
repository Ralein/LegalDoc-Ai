export interface TextProcessingRequest {
  text: string
  type: "grammar" | "concise" | "elaborate" | "rephrase" | "summarize" | "translate"
  context?: string
  language?: string
}

export interface TextProcessingResponse {
  original: string
  suggestion: string
  explanation: string
  confidence: number
  changes: string[]
}

class TextProcessor {
  processText(request: TextProcessingRequest): TextProcessingResponse {
    const { text, type, language } = request

    switch (type) {
      case "grammar":
        return this.fixGrammar(text)
      case "concise":
        return this.makeConcise(text)
      case "elaborate":
        return this.elaborate(text)
      case "rephrase":
        return this.rephrase(text)
      case "summarize":
        return this.summarize(text)
      case "translate":
        return this.translate(text, language || "tamil")
      default:
        return {
          original: text,
          suggestion: text,
          explanation: "No processing applied",
          confidence: 1.0,
          changes: [],
        }
    }
  }

  private fixGrammar(text: string): TextProcessingResponse {
    // Simple grammar fixes
    const suggestion = text
      .replace(/\bi\b/g, "I")
      .replace(/\s+/g, " ")
      .replace(/([.!?])\s*([a-z])/g, (match, punct, letter) => punct + " " + letter.toUpperCase())
      .trim()

    return {
      original: text,
      suggestion,
      explanation: "Applied basic grammar corrections",
      confidence: 0.8,
      changes: ["Capitalized 'I'", "Fixed spacing", "Capitalized sentences"],
    }
  }

  private makeConcise(text: string): TextProcessingResponse {
    // Remove redundant words and phrases
    const suggestion = text
      .replace(/\b(very|really|quite|rather|extremely)\s+/gi, "")
      .replace(/\b(in order to|so as to)\b/gi, "to")
      .replace(/\b(due to the fact that|owing to the fact that)\b/gi, "because")
      .replace(/\s+/g, " ")
      .trim()

    return {
      original: text,
      suggestion,
      explanation: "Removed redundant words and phrases",
      confidence: 0.9,
      changes: ["Removed filler words", "Simplified phrases"],
    }
  }

  private elaborate(text: string): TextProcessingResponse {
    // Add more detail to short sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim())
    const elaborated =
      sentences
        .map((sentence) => {
          const trimmed = sentence.trim()
          if (trimmed.length < 20) {
            return trimmed + " with proper documentation and evidence"
          }
          return trimmed
        })
        .join(". ") + "."

    return {
      original: text,
      suggestion: elaborated,
      explanation: "Added detail to short sentences",
      confidence: 0.7,
      changes: ["Extended short sentences", "Added context"],
    }
  }

  private rephrase(text: string): TextProcessingResponse {
    // Simple rephrasing by changing sentence structure
    const suggestion = text
      .replace(/\bThe accused\b/gi, "The defendant")
      .replace(/\bThe complainant\b/gi, "The plaintiff")
      .replace(/\bIt is alleged that\b/gi, "According to the complaint")
      .replace(/\bOn the said date\b/gi, "On the aforementioned date")

    return {
      original: text,
      suggestion,
      explanation: "Rephrased using legal terminology",
      confidence: 0.8,
      changes: ["Used formal legal terms", "Improved sentence structure"],
    }
  }

  private summarize(text: string): TextProcessingResponse {
    // Simple summarization by taking first and last sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim())
    let suggestion = text

    if (sentences.length > 3) {
      suggestion = sentences[0].trim() + ". " + sentences[sentences.length - 1].trim() + "."
    }

    return {
      original: text,
      suggestion,
      explanation: "Created summary using key sentences",
      confidence: 0.6,
      changes: ["Extracted key points", "Reduced length"],
    }
  }

  private translate(text: string, targetLanguage: string): TextProcessingResponse {
    // Basic Tamil translations for common legal terms
    const translations: Record<string, string> = {
      complaint: "புகார்",
      accused: "குற்றம் சாட்டப்பட்டவர்",
      police: "காவல்துறை",
      court: "நீதிமன்றம்",
      evidence: "சாட்சி",
      witness: "சாட்சி",
      case: "வழக்கு",
      investigation: "விசாரணை",
      report: "அறிக்கை",
      date: "தேதி",
      time: "நேரம்",
      place: "இடம்",
      name: "பெயர்",
      address: "முகவரி",
    }

    let suggestion = text
    if (targetLanguage === "tamil") {
      Object.entries(translations).forEach(([english, tamil]) => {
        const regex = new RegExp(`\\b${english}\\b`, "gi")
        suggestion = suggestion.replace(regex, tamil)
      })
    }

    return {
      original: text,
      suggestion,
      explanation: `Translated key terms to ${targetLanguage}`,
      confidence: 0.7,
      changes: ["Translated legal terms", "Maintained document structure"],
    }
  }

  validateDocument(
    content: string,
    templateType: string,
  ): {
    completeness: number
    missingFields: string[]
    suggestions: string[]
  } {
    const requiredFields: Record<string, string[]> = {
      fir: ["complainant", "accused", "incident", "date", "place", "police station"],
      "charge-sheet": ["accused", "charges", "evidence", "court", "case number"],
      "investigation-report": ["case details", "findings", "recommendations", "officer"],
    }

    const fields = requiredFields[templateType] || []
    const missingFields: string[] = []
    const suggestions: string[] = []

    fields.forEach((field) => {
      const fieldRegex = new RegExp(field, "i")
      if (!fieldRegex.test(content)) {
        missingFields.push(field)
        suggestions.push(`Add ${field} information`)
      }
    })

    const completeness = Math.max(0, ((fields.length - missingFields.length) / fields.length) * 100)

    return {
      completeness: Math.round(completeness),
      missingFields,
      suggestions,
    }
  }
}

export const textProcessor = new TextProcessor()
