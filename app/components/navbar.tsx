"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function Navbar() {
  const { publicKey, connected } = useWallet()

  const shortAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) +
      "..." +
      publicKey.toBase58().slice(-4)
    : null

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        
        {/* Left Side */}
        <span className="text-base font-semibold tracking-tight">
          Deplite
        </span>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          
          {connected && shortAddress && (
            <div className="text-right">
              <p className="text-xs text-gray-500">
                Admin:{" "}
                <span className="font-mono text-black">
                  {shortAddress}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Network:{" "}
                <span className="text-black">
                  Devnet
                </span>
              </p>
            </div>
          )}

          <WalletMultiButton className="!bg-black !text-white hover:!bg-gray-800 !rounded-md !text-sm" />
        </div>
      </div>
    </header>
  )
}