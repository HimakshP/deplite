"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { CreateFlagForm } from "@/components/create-flag-form"
import { FlagList } from "@/components/flag-list"
import { HowItWorks } from "@/components/how-it-works"
import type { Flag } from "@/components/flag-item"



function deriveMockPda(admin: string, name: string): string {
  const input = admin + name
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  const hashStr = Math.abs(hash).toString(16)
  return hashStr.slice(0, 6) + "..." + name.slice(0, 4)
}

export default function Page() {
const { publicKey, connected } = useWallet()
  const [flags, setFlags] = useState<Flag[]>([])

  const onCreateFlag = useCallback((name: string) => {
    if (flags.some(f => f.name === name)) {
      return
    }
    if (!publicKey) return
    const newFlag: Flag = {
      id: crypto.randomUUID(),
      name,
      enabled: false,
      pda: deriveMockPda(publicKey.toBase58(), name),
    }
    setFlags((prev) =>
      [...prev, newFlag].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    )
  }, [publicKey, flags])

  const onToggleFlag = useCallback((id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    )
  }, [])

  const onDeleteFlag = useCallback((id: string) => {
    setFlags((prev) => prev.filter((f) => f.id !== id))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {!connected ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <h1 className="text-lg font-semibold text-foreground">
              Connect your wallet to manage feature flags
            </h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              Each wallet controls its own namespace of on-chain flags.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Description Panel */}
            <section className="border-b border-gray-200 pb-8">
              <h1 className="text-lg font-semibold text-foreground text-balance">
                Decentralized Feature Flags on Solana
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Manage feature toggles for your application directly on-chain.
                Changes take effect instantly without redeploying your code.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/70">
                Flags are stored as Program Derived Accounts (PDAs) derived from your wallet address and flag name.
              </p>
            </section>

            {/* Create New Flag */}
            <div className="border-b border-gray-200 pb-8">
              <CreateFlagForm onCreateFlag={onCreateFlag} />
            </div>

            {/* Existing Flags */}
            <p className="text-xs text-muted-foreground">
              {flags.length} flag{flags.length !== 1 ? "s" : ""} in this namespace
            </p>
            <FlagList
              flags={flags}
              onToggle={onToggleFlag}
              onDelete={onDeleteFlag}
            />

            {/* How It Works */}
            <HowItWorks />
          </div>
        )}
      </main>
    </div>
  )
}
