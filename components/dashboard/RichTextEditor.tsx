"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
// Quill CSS must be imported in this file to load on client only
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full animate-pulse rounded-lg border border-border bg-secondary/30" />
  ),
})

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

const TOOLBAR_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
}

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "align",
  "link",
]

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write a detailed property description…",
  error,
}: RichTextEditorProps) {
  const modules = useMemo(() => TOOLBAR_MODULES, [])

  return (
    <div className="rich-text-editor-wrapper">
      <style>{`
        .rich-text-editor-wrapper .ql-toolbar.ql-snow {
          border-color: var(--color-border);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          background: var(--color-secondary);
          padding: 8px 10px;
        }
        .rich-text-editor-wrapper .ql-container.ql-snow {
          border-color: var(--color-border);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          background: var(--color-background);
          font-size: 14px;
          font-family: inherit;
        }
        .rich-text-editor-wrapper .ql-editor {
          min-height: 180px;
          color: var(--color-foreground);
          line-height: 1.7;
        }
        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: var(--color-muted-foreground);
          font-style: normal;
          left: 15px;
        }
        .rich-text-editor-wrapper .ql-snow .ql-stroke {
          stroke: var(--color-muted-foreground);
        }
        .rich-text-editor-wrapper .ql-snow .ql-fill {
          fill: var(--color-muted-foreground);
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker {
          color: var(--color-muted-foreground);
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker-options {
          background: var(--color-popover);
          border-color: var(--color-border);
          border-radius: var(--radius-md);
        }
        .rich-text-editor-wrapper .ql-snow .ql-active .ql-stroke,
        .rich-text-editor-wrapper .ql-snow button:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-picker-label:hover .ql-stroke {
          stroke: var(--color-primary);
        }
        .rich-text-editor-wrapper .ql-snow .ql-active .ql-fill,
        .rich-text-editor-wrapper .ql-snow button:hover .ql-fill {
          fill: var(--color-primary);
        }
        .rich-text-editor-wrapper .ql-snow .ql-active,
        .rich-text-editor-wrapper .ql-snow button:hover,
        .rich-text-editor-wrapper .ql-snow .ql-picker-label:hover {
          color: var(--color-primary);
        }
        .rich-text-editor-wrapper .ql-editor h1 { font-size: 1.5em; font-weight: 700; margin-bottom: 0.5em; }
        .rich-text-editor-wrapper .ql-editor h2 { font-size: 1.25em; font-weight: 600; margin-bottom: 0.4em; }
        .rich-text-editor-wrapper .ql-editor h3 { font-size: 1.1em; font-weight: 600; margin-bottom: 0.3em; }
        .rich-text-editor-wrapper .ql-editor blockquote {
          border-left: 3px solid var(--color-primary);
          padding-left: 12px;
          color: var(--color-muted-foreground);
          margin: 8px 0;
        }
        .rich-text-editor-wrapper .ql-editor pre.ql-syntax {
          background: var(--color-secondary);
          border-radius: var(--radius-md);
          padding: 12px;
          font-size: 13px;
          color: var(--color-foreground);
        }
        .rich-text-editor-wrapper.has-error .ql-toolbar.ql-snow,
        .rich-text-editor-wrapper.has-error .ql-container.ql-snow {
          border-color: var(--color-destructive);
        }
      `}</style>
      <div className={error ? "has-error rich-text-editor-wrapper" : ""}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={FORMATS}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
