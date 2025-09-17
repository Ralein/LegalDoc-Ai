"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  english: {
    // Dashboard
    "dashboard.welcome": "Welcome to LegalDoc AI",
    "dashboard.subtitle": "Create professional legal documents with AI assistance",
    "dashboard.totalDocuments": "Total Documents",
    "dashboard.inProgress": "In Progress",
    "dashboard.completed": "Completed",
    "dashboard.templatesUsed": "Templates Used",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.quickActionsDesc": "Start creating documents with our templates",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.recentActivityDesc": "Your latest document activities",
    "dashboard.recentDocuments": "Recent Documents",
    "dashboard.recentDocumentsDesc": "Continue working on your documents",

    // Templates
    "templates.newFir": "New FIR",
    "templates.chargeSheet": "Charge Sheet",
    "templates.report": "Report",
    "templates.fir": "First Information Report (FIR)",
    "templates.firDesc": "Standard police complaint registration form",
    "templates.chargeSheetDesc": "Formal document containing charges against accused",
    "templates.investigationReport": "Investigation Report",
    "templates.investigationReportDesc": "Comprehensive investigation findings report",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.templates": "Templates",
    "nav.editor": "Editor",
    "nav.archive": "Archive",
    "nav.settings": "Settings",

    // Common
    "common.search": "Search documents, templates...",
    "common.edit": "Edit",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.export": "Export",
    "common.create": "Create",
    "common.loading": "Loading...",
    "common.noData": "No data available",

    // Status
    "status.completed": "Completed",
    "status.draft": "Draft",
    "status.review": "Review",

    // Time
    "time.hoursAgo": "hours ago",
    "time.dayAgo": "day ago",
    "time.lastEdited": "Last edited",
    "time.justNow": "Just now",

    // AI Features
    "ai.grammarFix": "Grammar Fix",
    "ai.concise": "Make Concise",
    "ai.elaborate": "Elaborate",
    "ai.rephrase": "Rephrase",
    "ai.summarize": "Summarize",
    "ai.suggestions": "AI Suggestions",

    // Document Fields
    "fields.firNumber": "FIR Number",
    "fields.complainantName": "Complainant Name",
    "fields.incidentDate": "Date of Incident",
    "fields.incidentLocation": "Place of Incident",
    "fields.incidentDetails": "Details of Incident",
    "fields.policeStation": "Police Station",

    // Messages
    "messages.documentCreated": "Document created successfully",
    "messages.documentSaved": "Document saved",
    "messages.documentDeleted": "Document deleted",
    "messages.exportSuccess": "Document exported successfully",
  },

  tamil: {
    // Dashboard
    "dashboard.welcome": "லீகல்டாக் AI க்கு வரவேற்கிறோம்",
    "dashboard.subtitle": "AI உதவியுடன் தொழில்முறை சட்ட ஆவணங்களை உருவாக்குங்கள்",
    "dashboard.totalDocuments": "மொத்த ஆவணங்கள்",
    "dashboard.inProgress": "செயல்பாட்டில்",
    "dashboard.completed": "முடிக்கப்பட்டது",
    "dashboard.templatesUsed": "பயன்படுத்தப்பட்ட வார்ப்புருக்கள்",
    "dashboard.quickActions": "விரைவு செயல்கள்",
    "dashboard.quickActionsDesc": "எங்கள் வார்ப்புருக்களுடன் ஆவணங்களை உருவாக்க தொடங்குங்கள்",
    "dashboard.recentActivity": "சமீபத்திய செயல்பாடு",
    "dashboard.recentActivityDesc": "உங்கள் சமீபத்திய ஆவண செயல்பாடுகள்",
    "dashboard.recentDocuments": "சமீபத்திய ஆவணங்கள்",
    "dashboard.recentDocumentsDesc": "உங்கள் ஆவணங்களில் தொடர்ந்து பணியாற்றுங்கள்",

    // Templates
    "templates.newFir": "புதிய FIR",
    "templates.chargeSheet": "குற்றச்சாட்டு பத்திரம்",
    "templates.report": "அறிக்கை",
    "templates.fir": "முதல் தகவல் அறிக்கை (FIR)",
    "templates.firDesc": "நிலையான காவல் புகார் பதிவு படிவம்",
    "templates.chargeSheetDesc": "குற்றம் சாட்டப்பட்டவர்களுக்கு எதிரான குற்றச்சாட்டுகளைக் கொண்ட முறையான ஆவணம்",
    "templates.investigationReport": "விசாரணை அறிக்கை",
    "templates.investigationReportDesc": "விரிவான விசாரணை கண்டுபிடிப்புகள் அறிக்கை",

    // Navigation
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.templates": "வார்ப்புருக்கள்",
    "nav.editor": "எடிட்டர்",
    "nav.archive": "காப்பகம்",
    "nav.settings": "அமைப்புகள்",

    // Common
    "common.search": "ஆவணங்கள், வார்ப்புருக்களைத் தேடுங்கள்...",
    "common.edit": "திருத்து",
    "common.save": "சேமி",
    "common.cancel": "ரத்து செய்",
    "common.delete": "நீக்கு",
    "common.export": "ஏற்றுமதி",
    "common.create": "உருவாக்கு",
    "common.loading": "ஏற்றுகிறது...",
    "common.noData": "தரவு இல்லை",

    // Status
    "status.completed": "முடிக்கப்பட்டது",
    "status.draft": "வரைவு",
    "status.review": "மதிப்பாய்வு",

    // Time
    "time.hoursAgo": "மணி நேரங்களுக்கு முன்பு",
    "time.dayAgo": "நாள் முன்பு",
    "time.lastEdited": "கடைசியாக திருத்தப்பட்டது",
    "time.justNow": "இப்போதே",

    // AI Features
    "ai.grammarFix": "இலக்கணம் சரிசெய்",
    "ai.concise": "சுருக்கமாக்கு",
    "ai.elaborate": "விரிவாக்கு",
    "ai.rephrase": "மறுபதிப்பு",
    "ai.summarize": "சுருக்கம்",
    "ai.suggestions": "AI பரிந்துரைகள்",

    // Document Fields
    "fields.firNumber": "FIR எண்",
    "fields.complainantName": "புகார்தாரர் பெயர்",
    "fields.incidentDate": "சம்பவ தேதி",
    "fields.incidentLocation": "சம்பவ இடம்",
    "fields.incidentDetails": "சம்பவ விவரங்கள்",
    "fields.policeStation": "காவல் நிலையம்",

    // Messages
    "messages.documentCreated": "ஆவணம் வெற்றிகரமாக உருவாக்கப்பட்டது",
    "messages.documentSaved": "ஆவணம் சேமிக்கப்பட்டது",
    "messages.documentDeleted": "ஆவணம் நீக்கப்பட்டது",
    "messages.exportSuccess": "ஆவணம் வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("english")

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage && (savedLanguage === "english" || savedLanguage === "tamil")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: string): string => {
    const translation = translations[language as keyof typeof translations]
    return translation?.[key as keyof typeof translation] || key
  }

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
