"use client"

import { useState } from "react"

interface CreateFlagFormProps {
  onCreateFlag: (name: string) => void
}

export function CreateFlagForm({ onCreateFlag }: CreateFlagFormProps) {
  const [flagName, setFlagName] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = flagName.trim()
    if (!trimmed) return
    onCreateFlag(trimmed)
    setFlagName("")
  }

  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground">Create New Flag</h2>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-3">
        <input
          type="text"
          value={flagName}
          onChange={(e) => setFlagName(e.target.value)}
          placeholder="e.g. beta_checkout"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Create Flag
        </button>
      </form>
    </section>
  )
}
