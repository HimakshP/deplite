import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor"
import { Connection } from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"
import idl from "@/idl/deplite.json"
import { PublicKey } from "@solana/web3.js"

const PROGRAM_ID = new PublicKey("C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu")

export function getProgram(wallet: any) {
  const connection = new Connection("https://api.devnet.solana.com")

  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  )

  return new Program(idl as Idl, provider)
}