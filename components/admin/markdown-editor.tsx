"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="border rounded-md">
      <div className="flex justify-between items-center p-2 border-b bg-muted/50">
        <span className="text-sm font-medium">Editor Markdown</span>
        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://www.markdown-cheatsheet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <span>Markdown Cheatsheet</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Scrieți conținutul lecției folosind Markdown..."
        className="min-h-[300px] border-0 rounded-none focus-visible:ring-0 resize-y"
      />
    </div>
  )
}
