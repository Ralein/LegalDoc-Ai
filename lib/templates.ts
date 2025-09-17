export interface TemplateField {
  id: string
  label: string
  type: "text" | "textarea" | "date" | "select" | "number"
  required: boolean
  placeholder?: string
  options?: string[]
  defaultValue?: string
}

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  category: string
  fields: TemplateField[]
  content: string
}

export const documentTemplates: Record<string, DocumentTemplate> = {
  fir: {
    id: "fir",
    name: "First Information Report (FIR)",
    description: "Standard police complaint registration form",
    category: "Police",
    fields: [
      {
        id: "fir_number",
        label: "FIR Number",
        type: "text",
        required: true,
        placeholder: "FIR/2024/001",
      },
      {
        id: "date_time",
        label: "Date and Time of Incident",
        type: "date",
        required: true,
      },
      {
        id: "complainant_name",
        label: "Complainant Name",
        type: "text",
        required: true,
        placeholder: "Full name of complainant",
      },
      {
        id: "complainant_address",
        label: "Complainant Address",
        type: "textarea",
        required: true,
        placeholder: "Complete address with pin code",
      },
      {
        id: "complainant_phone",
        label: "Phone Number",
        type: "text",
        required: true,
        placeholder: "+91-XXXXXXXXXX",
      },
      {
        id: "incident_location",
        label: "Place of Incident",
        type: "textarea",
        required: true,
        placeholder: "Detailed location where incident occurred",
      },
      {
        id: "incident_details",
        label: "Details of Incident",
        type: "textarea",
        required: true,
        placeholder: "Detailed description of what happened",
      },
      {
        id: "accused_details",
        label: "Details of Accused (if known)",
        type: "textarea",
        required: false,
        placeholder: "Name, address, and other details of accused person(s)",
      },
      {
        id: "witnesses",
        label: "Witness Details",
        type: "textarea",
        required: false,
        placeholder: "Names and contact details of witnesses",
      },
      {
        id: "property_stolen",
        label: "Property Stolen/Damaged",
        type: "textarea",
        required: false,
        placeholder: "List of items stolen or damaged with approximate value",
      },
      {
        id: "police_station",
        label: "Police Station",
        type: "text",
        required: true,
        placeholder: "Name of police station",
      },
      {
        id: "investigating_officer",
        label: "Investigating Officer",
        type: "text",
        required: true,
        placeholder: "Name and designation",
      },
    ],
    content: `
# FIRST INFORMATION REPORT (FIR)

**FIR No:** {{fir_number}}  
**Date:** {{date_time}}  
**Police Station:** {{police_station}}

## COMPLAINANT DETAILS
**Name:** {{complainant_name}}  
**Address:** {{complainant_address}}  
**Phone:** {{complainant_phone}}

## INCIDENT DETAILS
**Date and Time of Incident:** {{date_time}}  
**Place of Incident:** {{incident_location}}

**Details of Incident:**
{{incident_details}}

## ACCUSED DETAILS
{{accused_details}}

## WITNESS DETAILS
{{witnesses}}

## PROPERTY DETAILS
{{property_stolen}}

## INVESTIGATION
**Investigating Officer:** {{investigating_officer}}

---
**Complainant Signature:** ________________  
**Date:** ________________

**Receiving Officer:** ________________  
**Signature:** ________________  
**Date:** ________________
    `,
  },

  "charge-sheet": {
    id: "charge-sheet",
    name: "Charge Sheet",
    description: "Formal document containing charges against accused",
    category: "Court",
    fields: [
      {
        id: "case_number",
        label: "Case Number",
        type: "text",
        required: true,
        placeholder: "CC/2024/001",
      },
      {
        id: "court_name",
        label: "Court Name",
        type: "text",
        required: true,
        placeholder: "Name of the court",
      },
      {
        id: "accused_name",
        label: "Name of Accused",
        type: "text",
        required: true,
        placeholder: "Full name of accused",
      },
      {
        id: "accused_address",
        label: "Address of Accused",
        type: "textarea",
        required: true,
        placeholder: "Complete address of accused",
      },
      {
        id: "charges",
        label: "Charges/Sections",
        type: "textarea",
        required: true,
        placeholder: "IPC sections and charges (e.g., Section 302, 307 IPC)",
      },
      {
        id: "incident_date",
        label: "Date of Incident",
        type: "date",
        required: true,
      },
      {
        id: "incident_summary",
        label: "Summary of Incident",
        type: "textarea",
        required: true,
        placeholder: "Brief summary of the incident",
      },
      {
        id: "evidence_summary",
        label: "Evidence Summary",
        type: "textarea",
        required: true,
        placeholder: "Summary of evidence collected",
      },
      {
        id: "investigation_summary",
        label: "Investigation Summary",
        type: "textarea",
        required: true,
        placeholder: "Summary of investigation conducted",
      },
      {
        id: "public_prosecutor",
        label: "Public Prosecutor",
        type: "text",
        required: true,
        placeholder: "Name of public prosecutor",
      },
    ],
    content: `
# CHARGE SHEET

**Case No:** {{case_number}}  
**Court:** {{court_name}}  
**Date:** {{current_date}}

## ACCUSED DETAILS
**Name:** {{accused_name}}  
**Address:** {{accused_address}}

## CHARGES
**Sections:** {{charges}}  
**Date of Incident:** {{incident_date}}

## INCIDENT SUMMARY
{{incident_summary}}

## EVIDENCE
{{evidence_summary}}

## INVESTIGATION
{{investigation_summary}}

## CONCLUSION
Based on the investigation and evidence collected, it is submitted that there is sufficient evidence to proceed against the accused under the mentioned sections.

**Public Prosecutor:** {{public_prosecutor}}  
**Signature:** ________________  
**Date:** ________________

**Investigating Officer:** ________________  
**Signature:** ________________  
**Date:** ________________
    `,
  },

  "investigation-report": {
    id: "investigation-report",
    name: "Investigation Report",
    description: "Comprehensive investigation findings report",
    category: "Investigation",
    fields: [
      {
        id: "report_number",
        label: "Report Number",
        type: "text",
        required: true,
        placeholder: "INV/2024/001",
      },
      {
        id: "case_title",
        label: "Case Title",
        type: "text",
        required: true,
        placeholder: "Brief title of the case",
      },
      {
        id: "investigation_period",
        label: "Investigation Period",
        type: "text",
        required: true,
        placeholder: "From DD/MM/YYYY to DD/MM/YYYY",
      },
      {
        id: "investigating_team",
        label: "Investigating Team",
        type: "textarea",
        required: true,
        placeholder: "Names and designations of investigating officers",
      },
      {
        id: "case_background",
        label: "Case Background",
        type: "textarea",
        required: true,
        placeholder: "Background and context of the case",
      },
      {
        id: "investigation_methodology",
        label: "Investigation Methodology",
        type: "textarea",
        required: true,
        placeholder: "Methods and procedures used in investigation",
      },
      {
        id: "findings",
        label: "Key Findings",
        type: "textarea",
        required: true,
        placeholder: "Important findings from the investigation",
      },
      {
        id: "evidence_analysis",
        label: "Evidence Analysis",
        type: "textarea",
        required: true,
        placeholder: "Analysis of collected evidence",
      },
      {
        id: "conclusions",
        label: "Conclusions",
        type: "textarea",
        required: true,
        placeholder: "Conclusions drawn from the investigation",
      },
      {
        id: "recommendations",
        label: "Recommendations",
        type: "textarea",
        required: true,
        placeholder: "Recommendations for further action",
      },
    ],
    content: `
# INVESTIGATION REPORT

**Report No:** {{report_number}}  
**Case:** {{case_title}}  
**Investigation Period:** {{investigation_period}}  
**Date of Report:** {{current_date}}

## INVESTIGATING TEAM
{{investigating_team}}

## CASE BACKGROUND
{{case_background}}

## INVESTIGATION METHODOLOGY
{{investigation_methodology}}

## KEY FINDINGS
{{findings}}

## EVIDENCE ANALYSIS
{{evidence_analysis}}

## CONCLUSIONS
{{conclusions}}

## RECOMMENDATIONS
{{recommendations}}

---
**Prepared by:** ________________  
**Designation:** ________________  
**Signature:** ________________  
**Date:** ________________

**Reviewed by:** ________________  
**Designation:** ________________  
**Signature:** ________________  
**Date:** ________________
    `,
  },
}

export function getTemplate(id: string): DocumentTemplate | null {
  return documentTemplates[id] || null
}

export function getAllTemplates(): DocumentTemplate[] {
  return Object.values(documentTemplates)
}

export function getTemplatesByCategory(category: string): DocumentTemplate[] {
  if (category === "All") return getAllTemplates()
  return getAllTemplates().filter((template) => template.category === category)
}
