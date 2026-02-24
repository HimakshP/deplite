"use client"

import { FlagItem, type Flag } from "./flag-item"

interface FlagListProps {
  flags: Flag[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function FlagList({ flags, onToggle, onDelete }: FlagListProps) {
  return (
    <section className="border-b border-gray-200 pb-8">
      <h2 className="text-sm font-semibold text-foreground">Your Feature Flags</h2>
      {flags.length === 0 ? (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No feature flags created yet.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Create a flag to begin managing on-chain configuration.
          </p>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {flags.map((flag) => (
            <FlagItem
              key={flag.id}
              flag={flag}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
