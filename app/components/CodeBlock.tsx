"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

// Lightweight syntax highlighter for TS/JS-ish snippets.
function highlight(code: string) {
  const keywords = /\b(import|from|const|let|var|async|await|function|return|if|else|new|export|default)\b/g;
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let html = escape(code);
  // comments
  html = html.replace(/(\/\/[^\n]*)/g, '<span class="text-code-comment">$1</span>');
  // strings
  html = html.replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|"[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="text-code-string">$1</span>');
  // keywords
  html = html.replace(keywords, '<span class="text-code-keyword">$1</span>');
  // function calls
  html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-code-fn">$1</span>(');
  return html;
}

export function CodeBlock({ code, language = "ts", filename, className, showLineNumbers }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const lines = code.split("\n");

  return (
    <div className={cn(
      "group rounded-lg border border-code-border bg-code overflow-hidden text-code-fg shadow-lg transition-all duration-200 hover:border-primary/40 hover:shadow-blue-glow",
      className,
    )}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-code-border bg-code">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(0_70%_60%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(40_90%_60%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(140_60%_55%)]" />
          {filename && (
            <span className="ml-3 font-mono text-xs text-code-muted">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-code-muted">{language}</span>
          <button
            onClick={onCopy}
            className="text-code-muted hover:text-code-fg transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed font-mono">
        <code>
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-8 text-code-muted text-right pr-4">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }} />
                </div>
              ))
            : <span dangerouslySetInnerHTML={{ __html: highlight(code) }} />}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;