"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Download, Upload, Trash2, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({
    // Profile
    name: "Inspector Kumar",
    email: "kumar@police.gov.in",
    department: "Mumbai Police",
    designation: "Inspector",
    badgeNumber: "MP001234",

    // Preferences
    autoSave: true,
    spellCheck: true,
    aiSuggestions: true,
    documentValidation: true,

    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    documentReminders: true,
    systemUpdates: true,

    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // In a real app, this would save to backend
  }

  const handleExportData = () => {
    console.log("Exporting user data...")
    // In a real app, this would trigger data export
  }

  const handleImportData = () => {
    console.log("Importing user data...")
    // In a real app, this would handle file upload
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground text-lg">Manage your account and application preferences</p>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and professional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => handleSettingChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={settings.department}
                        onChange={(e) => handleSettingChange("department", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        value={settings.designation}
                        onChange={(e) => handleSettingChange("designation", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="badge">Badge Number</Label>
                      <Input
                        id="badge"
                        value={settings.badgeNumber}
                        onChange={(e) => handleSettingChange("badgeNumber", e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profile Status</h3>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">Verified Account</Badge>
                      <Badge variant="outline">Premium Features</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Preferences</CardTitle>
                    <CardDescription>Customize your LegalDoc AI experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={handleLanguageChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                            <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={theme} onValueChange={handleThemeChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Editor Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoSave">Auto-save documents</Label>
                            <p className="text-sm text-muted-foreground">Automatically save changes every 30 seconds</p>
                          </div>
                          <Switch
                            id="autoSave"
                            checked={settings.autoSave}
                            onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="spellCheck">Spell check</Label>
                            <p className="text-sm text-muted-foreground">Enable spell checking while typing</p>
                          </div>
                          <Switch
                            id="spellCheck"
                            checked={settings.spellCheck}
                            onCheckedChange={(checked) => handleSettingChange("spellCheck", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="aiSuggestions">AI suggestions</Label>
                            <p className="text-sm text-muted-foreground">Show AI writing suggestions</p>
                          </div>
                          <Switch
                            id="aiSuggestions"
                            checked={settings.aiSuggestions}
                            onCheckedChange={(checked) => handleSettingChange("aiSuggestions", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="documentValidation">Document validation</Label>
                            <p className="text-sm text-muted-foreground">Check for required fields and completeness</p>
                          </div>
                          <Switch
                            id="documentValidation"
                            checked={settings.documentValidation}
                            onCheckedChange={(checked) => handleSettingChange("documentValidation", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="documentReminders">Document reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders for pending documents</p>
                      </div>
                      <Switch
                        id="documentReminders"
                        checked={settings.documentReminders}
                        onCheckedChange={(checked) => handleSettingChange("documentReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="systemUpdates">System updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications about app updates and features</p>
                      </div>
                      <Switch
                        id="systemUpdates"
                        checked={settings.systemUpdates}
                        onCheckedChange={(checked) => handleSettingChange("systemUpdates", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorAuth">Two-factor authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session timeout (minutes)</Label>
                        <Select
                          value={settings.sessionTimeout}
                          onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passwordExpiry">Password expiry (days)</Label>
                        <Select
                          value={settings.passwordExpiry}
                          onValueChange={(value) => handleSettingChange("passwordExpiry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Password</h3>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data Management */}
            <TabsContent value="data">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export, import, or delete your data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Export Data</h3>
                          <p className="text-sm text-muted-foreground">Download all your documents and settings</p>
                        </div>
                        <Button variant="outline" onClick={handleExportData}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Import Data</h3>
                          <p className="text-sm text-muted-foreground">Import documents from a backup file</p>
                        </div>
                        <Button variant="outline" onClick={handleImportData}>
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
                        <div>
                          <h3 className="font-semibold text-destructive">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
