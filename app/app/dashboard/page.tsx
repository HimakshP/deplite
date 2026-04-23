"use client"

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useState, useCallback, useEffect } from "react"
import { CreateFlagForm } from "@/components/create-flag-form"
import type { Flag } from "@/components/flag-item"
import { Connection, PublicKey } from "@solana/web3.js"
import { getProgram } from "@/lib/getProgram"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const PROGRAM_ID = new PublicKey("C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu")
//const connection = new PublicKey("https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f")

function deriveFlagPda(
  admin: PublicKey,
  name: string
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("feature_flag"),
      admin.toBuffer(),
      Buffer.from(name),
    ],
    PROGRAM_ID
  )

  return pda
}

export default function Page() {

  const wallet = useAnchorWallet()
  const { publicKey, connected } = useWallet()
  const [flags, setFlags] = useState<Flag[]>([])

  const fetchFlags = useCallback(async () => {
  if (!wallet || !publicKey) return

  try {
    const program = getProgram(wallet) 

    const accounts = await program.account.flagAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: publicKey.toBase58(),
        },
      },
    ])

    const formatted = accounts.map((acc: any) => ({
      id: acc.publicKey.toBase58(),
      name: acc.account.name,
      enabled: acc.account.enabled,
      pda:
        acc.publicKey.toBase58().slice(0, 6) +
        "..." +
        acc.publicKey.toBase58().slice(-4),
    }))

    setFlags(formatted)
  } catch (err) {
    console.error("Fetch flags error:", err)
  }
}, [wallet, publicKey])

useEffect(() => {
  if (connected) {
    fetchFlags()
  } else {
    setFlags([])
  }
}, [connected, publicKey])

useEffect(() => {
  if (!wallet || !publicKey) return

  const connection = new Connection("https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f")

  let subId: number

  const setup = async () => {

    subId = connection.onProgramAccountChange(
      PROGRAM_ID,
      async () => {
        console.log("FLAG CHANGED (dashboard)")
        await fetchFlags()
      }
    )
  }

  setup()

  return () => {
    if (subId) connection.removeProgramAccountChangeListener(subId)
  }
}, [wallet, publicKey, fetchFlags])

  const onCreateFlag = useCallback(
  async (name: string) => {
    if (!publicKey || !wallet) return

    try {
      const program = getProgram(wallet)

      if (flags.some((f) => f.name === name)) {
        console.warn("Flag with this name already exists")
        return
      }

      // Derive PDA (same seeds as contract)
      const [flagPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("feature_flag"),
          publicKey.toBuffer(),
          Buffer.from(name),
        ],
        program.programId
      )   

      // Send transaction
      await program.methods
        .initializeFlag(name)
        .accountsPartial({
          flag: flagPda,
          admin: publicKey,
        })
        .rpc()

      // Refetch from chain (source of truth)
      await fetchFlags()

    } catch (err) {
      console.error("Error creating flag:", err)
    }
  },
  [publicKey, wallet, flags, fetchFlags]
)



  const onToggleFlag = useCallback(
  async (flag: Flag) => {
    if (!wallet || !publicKey) return

    try {
      const program = getProgram(wallet) as any

      const flagPda = new PublicKey(flag.id)

      await program.methods
        .toggleFlag(!flag.enabled)
        .accounts({
          flag: flagPda,
          admin: publicKey,
        })
        .rpc()

      await fetchFlags()

    } catch (err) {
      console.error("Toggle error:", err)
    }
  },
  [wallet, publicKey, fetchFlags]
)

  const onDeleteFlag = useCallback(
  async (flag: Flag) => {
    if (!wallet || !publicKey) return

    try {
      const program = getProgram(wallet) as any

      const flagPda = new PublicKey(flag.id)

      await program.methods
        .closeFlag()
        .accounts({
          flag: flagPda,
          admin: publicKey,
        })
        .rpc()

      await fetchFlags()

    } catch (err) {
      console.error("Delete error:", err)
    }
  },
  [wallet, publicKey, fetchFlags]
)

  return (
    <div className="min-h-screen flex bg-secondary/40 w-full">
  {/* Sidebar */}
  <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
    <div className="h-14 px-5 flex items-center gap-2 border-b border-border">
      <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-[11px] font-mono">D</span>
      </div>
      <span className="font-semibold tracking-tight">Deplite</span>
    </div>

    <nav className="flex-1 p-3 space-y-1">
      <div className="px-3 py-2 rounded-md bg-primary-soft text-primary font-medium text-sm">
        Dashboard
      </div>
      <div className="px-3 py-2 text-sm text-muted-foreground">Docs</div>
    </nav>

    <div className="p-3 border-t border-border">
      <div className="rounded-lg border border-border bg-secondary/60 p-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-medium">Devnet</span>
        </div>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground truncate">
          api.devnet.solana.com
        </p>
      </div>
    </div>
  </aside>

  {/* Main */}
  <div className="flex-1 flex flex-col min-w-0">
    {/* Header */}
    <header className="h-14 px-6 border-b border-border bg-card flex items-center justify-between">
      <h1 className="font-semibold tracking-tight">Dashboard</h1>

      <div className="flex items-center gap-6">
        <WalletMultiButton className="!bg-black !text-white hover:!bg-gray-800 !rounded-md !text-sm" />

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-green-600">
      Solana Devnet Connected
                </span>
            </div>
      </div>
    </header>

    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      {!connected ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <h1 className="text-lg font-semibold">
            Connect your wallet to manage feature flags
          </h1>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border bg-card p-5">
              <p className="text-xs text-muted-foreground">Total flags</p>
              <p className="text-2xl font-bold">{flags.length}</p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <p className="text-xs text-muted-foreground">Enabled</p>
              <p className="text-2xl font-bold">
                {flags.filter((f) => f.enabled).length}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <p className="text-xs text-muted-foreground">Disabled</p>
              <p className="text-2xl font-bold">
                {flags.filter((f) => !f.enabled).length}
              </p>
            </div>
          </div>

          {/* Create Flag */}
          <div className="rounded-xl border bg-card p-5 mb-6">
            <CreateFlagForm onCreateFlag={onCreateFlag} />
          </div>

          {/* Flags */}
          <div className="space-y-3">
            {flags.map((flag) => (
              <div
                key={flag.id}
                className="rounded-lg border bg-card p-5 flex justify-between items-center"
              >
                <div>
                  <code className="font-mono text-sm">{flag.name}</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    {flag.enabled ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleFlag(flag)}
                    className={`px-3 py-1 text-xs rounded ${
                      flag.enabled
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {flag.enabled ? "ON" : "OFF"}
                  </button>

                  <button
                    onClick={() => onDeleteFlag(flag)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  </div>
</div>
  )}