export interface ExportOptions {
  format: "pdf" | "docx" | "html" | "txt"
  title: string
  content: string
  metadata?: {
    author?: string
    department?: string
    caseNumber?: string
    date?: Date
    templateType?: string
  }
  styling?: {
    fontSize?: number
    fontFamily?: string
    margins?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    header?: string
    footer?: string
  }
}

export interface ExportResult {
  success: boolean
  filename: string
  size?: number
  downloadUrl?: string
  error?: string
}

class ExportService {
  async exportDocument(options: ExportOptions): Promise<ExportResult> {
    try {
      switch (options.format) {
        case "pdf":
          return await this.exportToPDF(options)
        case "docx":
          return await this.exportToWord(options)
        case "html":
          return await this.exportToHTML(options)
        case "txt":
          return await this.exportToText(options)
        default:
          throw new Error(`Unsupported export format: ${options.format}`)
      }
    } catch (error) {
      return {
        success: false,
        filename: "",
        error: error instanceof Error ? error.message : "Export failed",
      }
    }
  }

  private async exportToPDF(options: ExportOptions): Promise<ExportResult> {
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const filename = `${this.sanitizeFilename(options.title)}.pdf`

    // In a real implementation, this would use a library like jsPDF or Puppeteer
    const pdfContent = this.generatePDFContent(options)

    // Create blob and download URL
    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const downloadUrl = URL.createObjectURL(blob)

    // Trigger download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return {
      success: true,
      filename,
      size: blob.size,
      downloadUrl,
    }
  }

  private async exportToWord(options: ExportOptions): Promise<ExportResult> {
    // Simulate Word document generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const filename = `${this.sanitizeFilename(options.title)}.docx`

    // In a real implementation, this would use a library like docx or mammoth
    const docContent = this.generateWordContent(options)

    // Create blob and download URL
    const blob = new Blob([docContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const downloadUrl = URL.createObjectURL(blob)

    // Trigger download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return {
      success: true,
      filename,
      size: blob.size,
      downloadUrl,
    }
  }

  private async exportToHTML(options: ExportOptions): Promise<ExportResult> {
    const filename = `${this.sanitizeFilename(options.title)}.html`

    const htmlContent = this.generateHTMLContent(options)

    const blob = new Blob([htmlContent], { type: "text/html" })
    const downloadUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return {
      success: true,
      filename,
      size: blob.size,
      downloadUrl,
    }
  }

  private async exportToText(options: ExportOptions): Promise<ExportResult> {
    const filename = `${this.sanitizeFilename(options.title)}.txt`

    // Strip HTML tags and convert to plain text
    const textContent = this.stripHTML(options.content)

    const blob = new Blob([textContent], { type: "text/plain" })
    const downloadUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return {
      success: true,
      filename,
      size: blob.size,
      downloadUrl,
    }
  }

  private generatePDFContent(options: ExportOptions): string {
    // Mock PDF content - in real app would generate actual PDF binary
    const metadata = options.metadata || {}
    const styling = options.styling || {}

    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(${options.title}) Tj
0 -20 Td
(Generated: ${new Date().toLocaleDateString()}) Tj
0 -40 Td
(${this.stripHTML(options.content).substring(0, 500)}...) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`
  }

  private generateWordContent(options: ExportOptions): string {
    // Mock Word document content - in real app would generate actual DOCX
    const metadata = options.metadata || {}

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Title"/>
      </w:pPr>
      <w:r>
        <w:t>${options.title}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Generated: ${new Date().toLocaleDateString()}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>${this.stripHTML(options.content)}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`
  }

  private generateHTMLContent(options: ExportOptions): string {
    const metadata = options.metadata || {}
    const styling = options.styling || {}

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${options.title}</title>
    <style>
        body {
            font-family: ${styling.fontFamily || "Arial, sans-serif"};
            font-size: ${styling.fontSize || 12}pt;
            line-height: 1.6;
            margin: ${styling.margins?.top || 1}in ${styling.margins?.right || 1}in ${styling.margins?.bottom || 1}in ${styling.margins?.left || 1}in;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .title {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .metadata {
            font-size: 10pt;
            color: #666;
            margin-bottom: 20px;
        }
        .content {
            text-align: justify;
        }
        .footer {
            margin-top: 40px;
            padding-top: 10px;
            border-top: 1px solid #ccc;
            font-size: 10pt;
            color: #666;
        }
        @media print {
            body { margin: 0.5in; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${options.title}</div>
        <div class="metadata">
            ${metadata.department ? `Department: ${metadata.department}<br>` : ""}
            ${metadata.caseNumber ? `Case Number: ${metadata.caseNumber}<br>` : ""}
            ${metadata.author ? `Author: ${metadata.author}<br>` : ""}
            Generated: ${new Date().toLocaleDateString()}
        </div>
    </div>
    
    <div class="content">
        ${options.content}
    </div>
    
    <div class="footer">
        <p>This document was generated by LegalDoc AI on ${new Date().toLocaleString()}</p>
        ${styling.footer ? `<p>${styling.footer}</p>` : ""}
    </div>
</body>
</html>`
  }

  private stripHTML(html: string): string {
    // Remove HTML tags and decode entities
    const tmp = document.createElement("div")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  private sanitizeFilename(filename: string): string {
    // Remove invalid characters for filenames
    return filename
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 100)
  }

  async batchExport(
    documents: Array<{
      title: string
      content: string
      metadata?: ExportOptions["metadata"]
    }>,
    format: ExportOptions["format"],
  ): Promise<ExportResult[]> {
    const results: ExportResult[] = []

    for (const doc of documents) {
      const result = await this.exportDocument({
        format,
        title: doc.title,
        content: doc.content,
        metadata: doc.metadata,
      })
      results.push(result)
    }

    return results
  }

  getExportPreview(options: ExportOptions): string {
    switch (options.format) {
      case "html":
        return this.generateHTMLContent(options)
      case "txt":
        return this.stripHTML(options.content)
      default:
        return `Preview not available for ${options.format} format`
    }
  }
}

export const exportService = new ExportService()
