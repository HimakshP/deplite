import { AnchorProvider, Program } from "@coral-xyz/anchor"
import { Connection } from "@solana/web3.js"
import { Deplite } from "/home/himax/code/deplite/app/idl/deplite"
import idl from "../idl/deplite.json"

export function getProgram(wallet: any) {
  
  const RPC =
  process.env.NEXT_PUBLIC_HELIUS_RPC ||
  "https://api.devnet.solana.com";

const connection = new Connection(RPC);
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  )
  return new Program<Deplite>(idl as Deplite, provider)
}