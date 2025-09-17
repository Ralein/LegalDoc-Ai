import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Star, Clock, Users } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: "fir",
    name: "First Information Report (FIR)",
    description: "Standard police complaint registration form with all required fields",
    category: "Police",
    fields: ["Complainant Details", "Incident Details", "Location", "Date & Time", "Witnesses"],
    popularity: 95,
    lastUsed: "2 hours ago",
    icon: FileText,
  },
  {
    id: "charge-sheet",
    name: "Charge Sheet",
    description: "Formal document containing charges against accused persons",
    category: "Court",
    fields: ["Accused Details", "Charges", "Evidence", "Investigation Summary", "Legal Sections"],
    popularity: 87,
    lastUsed: "1 day ago",
    icon: FileText,
  },
  {
    id: "investigation-report",
    name: "Investigation Report",
    description: "Comprehensive report documenting investigation findings",
    category: "Investigation",
    fields: ["Case Summary", "Evidence Analysis", "Witness Statements", "Conclusions", "Recommendations"],
    popularity: 76,
    lastUsed: "3 days ago",
    icon: FileText,
  },
  {
    id: "bail-application",
    name: "Bail Application",
    description: "Legal application for bail with supporting arguments",
    category: "Court",
    fields: ["Applicant Details", "Case Details", "Grounds for Bail", "Surety Details", "Legal Arguments"],
    popularity: 64,
    lastUsed: "1 week ago",
    icon: FileText,
  },
  {
    id: "witness-statement",
    name: "Witness Statement",
    description: "Formal statement recording witness testimony",
    category: "Evidence",
    fields: ["Witness Details", "Statement", "Date & Time", "Officer Details", "Signature"],
    popularity: 58,
    lastUsed: "2 weeks ago",
    icon: FileText,
  },
  {
    id: "search-warrant",
    name: "Search Warrant Application",
    description: "Application for court-issued search warrant",
    category: "Court",
    fields: ["Premises Details", "Grounds for Search", "Items to Search", "Officer Details", "Urgency"],
    popularity: 42,
    lastUsed: "1 month ago",
    icon: FileText,
  },
]

const categories = ["All", "Police", "Court", "Investigation", "Evidence"]

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Document Templates</h1>
              <p className="text-muted-foreground text-lg">Choose from professional legal document templates</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Template
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {template.popularity}%
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="mb-4">{template.description}</CardDescription>

                  {/* Template Fields */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Included Fields:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field) => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                      {template.fields.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.fields.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Last Used */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />
                    Last used {template.lastUsed}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/editor?template=${template.id}`}>Use Template</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Templates Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Most Popular Templates
              </CardTitle>
              <CardDescription>Templates frequently used by legal professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 3)
                  .map((template, index) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{template.popularity}% popularity</p>
                          <p className="text-xs text-muted-foreground">Last used {template.lastUsed}</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/editor?template=${template.id}`}>Use</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
