"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AIToolbar } from "@/components/ai-toolbar"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Type,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  title: string
  onTitleChange: (title: string) => void
}

export function RichTextEditor({ content, onChange, title, onTitleChange }: RichTextEditorProps) {
  const [showAIToolbar, setShowAIToolbar] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [aiToolbarPosition, setAIToolbarPosition] = useState({ x: 0, y: 0 })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection
      const text = editor.state.doc.textBetween(from, to, " ")

      if (text.trim().length > 0) {
        setSelectedText(text.trim())
      } else {
        setShowAIToolbar(false)
      }
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-6",
      },
    },
  })

  const handleShowAIToolbar = useCallback(() => {
    if (!editor) return

    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, " ")

    if (text.trim().length > 0) {
      setSelectedText(text.trim())
      setShowAIToolbar(true)

      // Position the AI toolbar near the selection
      const rect = editor.view.dom.getBoundingClientRect()
      setAIToolbarPosition({
        x: rect.right + 10,
        y: rect.top,
      })
    }
  }, [editor])

  const handleApplySuggestion = useCallback(
    (newText: string) => {
      if (!editor) return

      const { from, to } = editor.state.selection
      editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run()
    },
    [editor],
  )

  if (!editor) {
    return null
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    disabled = false,
  }: {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    disabled?: boolean
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn("h-8 w-8 p-0", isActive && "bg-primary text-primary-foreground")}
    >
      {children}
    </Button>
  )

  return (
    <div className="relative">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader className="pb-3">
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Document title..."
          />
        </CardHeader>

        <CardContent className="p-0">
          {/* Toolbar */}
          <div className="border-b border-border p-3">
            <div className="flex items-center gap-1 flex-wrap">
              {/* Text Formatting */}
              <div className="flex items-center gap-1">
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive("bold")}
                >
                  <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive("italic")}
                >
                  <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  isActive={editor.isActive("underline")}
                >
                  <UnderlineIcon className="h-4 w-4" />
                </ToolbarButton>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Headings */}
              <div className="flex items-center gap-1">
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  isActive={editor.isActive("heading", { level: 1 })}
                >
                  <Type className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  isActive={editor.isActive("heading", { level: 2 })}
                >
                  <Type className="h-3 w-3" />
                </ToolbarButton>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Lists */}
              <div className="flex items-center gap-1">
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  isActive={editor.isActive("bulletList")}
                >
                  <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  isActive={editor.isActive("orderedList")}
                >
                  <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Text Alignment */}
              <div className="flex items-center gap-1">
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  isActive={editor.isActive({ textAlign: "left" })}
                >
                  <AlignLeft className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  isActive={editor.isActive({ textAlign: "center" })}
                >
                  <AlignCenter className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  isActive={editor.isActive({ textAlign: "right" })}
                >
                  <AlignRight className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                  isActive={editor.isActive({ textAlign: "justify" })}
                >
                  <AlignJustify className="h-4 w-4" />
                </ToolbarButton>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Undo/Redo */}
              <div className="flex items-center gap-1">
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                  <Undo className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                  <Redo className="h-4 w-4" />
                </ToolbarButton>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowAIToolbar}
                  disabled={!selectedText}
                  className="h-8 px-3 gap-2 bg-transparent"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Tools
                </Button>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="min-h-[600px] bg-white">
            <EditorContent editor={editor} />
          </div>
        </CardContent>
      </Card>

      {showAIToolbar && (
        <div
          className="fixed z-50"
          style={{
            left: aiToolbarPosition.x,
            top: aiToolbarPosition.y,
          }}
        >
          <AIToolbar
            selectedText={selectedText}
            onApplySuggestion={handleApplySuggestion}
            onClose={() => setShowAIToolbar(false)}
          />
        </div>
      )}
    </div>
  )
}
