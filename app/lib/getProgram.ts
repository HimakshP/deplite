import { AnchorProvider, Program } from "@coral-xyz/anchor"
import { Connection } from "@solana/web3.js"
import idl from "@/idl/deplite.json"

export function getProgram(wallet: any) {
  const connection = new Connection("https://api.devnet.solana.com")
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  )
  return new Program(idl as any, provider)
}