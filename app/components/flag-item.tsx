"use client"

export interface Flag {
  id: string
  name: string
  enabled: boolean
  pda: string
}

interface FlagItemProps {
  flag: Flag
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function FlagItem({ flag, onToggle, onDelete }: FlagItemProps) {
  return (
    <div className="flex items-start justify-between border border-border rounded-md px-4 py-4">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm font-bold text-foreground">{flag.name}</p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Program Derived Address: <span className="font-mono">{flag.pda}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          On-chain state: {flag.enabled ? "Enabled" : "Disabled"}
        </p>
      </div>
      <div className="flex items-center gap-4 ml-4 flex-shrink-0">
        <button
          onClick={() => onToggle(flag.id)}
          className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors"
          style={{
            backgroundColor: flag.enabled
              ? "var(--color-foreground)"
              : "var(--color-border)",
          }}
          role="switch"
          aria-checked={flag.enabled}
          aria-label={`Toggle ${flag.name}`}
        >
          <span
            className="pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-background transition-transform"
            style={{
              transform: flag.enabled ? "translateX(17px)" : "translateX(3px)",
            }}
          />
        </button>
        <button
          onClick={() => onDelete(flag.id)}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
