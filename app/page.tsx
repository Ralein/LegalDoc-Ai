"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Edit3, TrendingUp, CheckCircle } from "lucide-react"
import { documentStore, type DocumentStats, type Document } from "@/lib/document-store"
import { LanguageProvider, useLanguage } from "@/lib/language-context"

function DashboardContent() {
  const [stats, setStats] = useState<DocumentStats>({
    total: 0,
    inProgress: 0,
    completed: 0,
    templatesUsed: 0,
    recentActivity: [],
  })
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    const loadData = () => {
      setStats(documentStore.getStats())
      setRecentDocuments(documentStore.getAllDocuments().slice(0, 3))
    }

    loadData()

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const createDocument = (type: "fir" | "charge-sheet" | "investigation-report") => {
    const titles = {
      fir: "New FIR Document",
      "charge-sheet": "New Charge Sheet",
      "investigation-report": "New Investigation Report",
    }

    const doc = documentStore.createDocument(titles[type], type)
    setStats(documentStore.getStats())
    setRecentDocuments(documentStore.getAllDocuments().slice(0, 3))

    // Navigate to editor (in a real app, this would use router)
    console.log(`Created document: ${doc.id}`)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours === 1) return `1 ${t("time.hoursAgo").replace("s", "")}`
    if (diffInHours < 24) return `${diffInHours} ${t("time.hoursAgo")}`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return `1 ${t("time.dayAgo")}`
    return `${diffInDays} days ago`
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("dashboard.welcome")}</h1>
            <p className="text-muted-foreground text-lg">{t("dashboard.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.totalDocuments")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? `+${Math.floor(stats.total * 0.1)} from last week` : "Start creating documents"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.inProgress")}</CardTitle>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.inProgress > 0 ? `${Math.min(stats.inProgress, 2)} due today` : "No pending documents"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.completed")}</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.completed > 0
                    ? `+${Math.floor(stats.completed * 0.2)} this week`
                    : "Complete your first document"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.templatesUsed")}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.templatesUsed}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.templatesUsed > 0 ? "FIR most popular" : "Try our templates"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("dashboard.quickActions")}</CardTitle>
                <CardDescription>{t("dashboard.quickActionsDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 bg-transparent"
                    onClick={() => createDocument("fir")}
                  >
                    <FileText className="h-6 w-6" />
                    <span>{t("templates.newFir")}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 bg-transparent"
                    onClick={() => createDocument("charge-sheet")}
                  >
                    <FileText className="h-6 w-6" />
                    <span>{t("templates.chargeSheet")}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 bg-transparent"
                    onClick={() => createDocument("investigation-report")}
                  >
                    <FileText className="h-6 w-6" />
                    <span>{t("templates.report")}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
                <CardDescription>{t("dashboard.recentActivityDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "completed"
                              ? "bg-green-500"
                              : activity.type === "updated"
                                ? "bg-blue-500"
                                : activity.type === "created"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("dashboard.recentDocuments")}</CardTitle>
              <CardDescription>{t("dashboard.recentDocumentsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.length > 0 ? (
                  recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("time.lastEdited")} {formatTimeAgo(doc.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            doc.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "draft"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {t(`status.${doc.status}`)}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No documents yet. Create your first document above!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  )
}
