"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // base (we override below)

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

function highlight(code: string, language: string) {
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    }
    return hljs.highlightAuto(code).value;
  } catch {
    return code;
  }
}

export function CodeBlock({
  code,
  language = "ts",
  filename,
  className,
  showLineNumbers,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "group rounded-xl border border-white/10 bg-[#0B0F19] text-white overflow-hidden shadow-lg transition-all duration-200 hover:border-blue-500/40",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0F1424]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />

          {filename && (
            <span className="ml-3 font-mono text-xs text-white/60">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            {language}
          </span>

          <button
            onClick={onCopy}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed font-mono bg-[#0B0F19]">
        <code className="hljs">
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-8 text-white/30 text-right pr-4">
                    {i + 1}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlight(line, language) || "&nbsp;",
                    }}
                  />
                </div>
              ))
            : (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight(code, language),
                }}
              />
            )}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;