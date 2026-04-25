"use client"

import { FC, ReactNode, useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react"
import "@solana/wallet-adapter-react-ui/styles.css"
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"



export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = "https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f"

  const wallets = useMemo(() => [new SolflareWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}