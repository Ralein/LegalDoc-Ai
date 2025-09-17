"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Globe, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("common.search")} className="pl-10" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleLanguageChange("english")}
                className={language === "english" ? "bg-accent" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLanguageChange("tamil")}
                className={language === "tamil" ? "bg-accent" : ""}
              >
                தமிழ் (Tamil)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
