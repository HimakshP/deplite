"use client"

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useState, useCallback, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { CreateFlagForm } from "@/components/create-flag-form"
import { FlagList } from "@/components/flag-list"
import { HowItWorks } from "@/components/how-it-works"
import type { Flag } from "@/components/flag-item"
import { Connection, PublicKey } from "@solana/web3.js"
import { getProgram } from "@/lib/getProgram"


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
