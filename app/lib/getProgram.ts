import { AnchorProvider, Program } from "@coral-xyz/anchor"
import { Connection } from "@solana/web3.js"
import { Deplite } from "/home/himax/code/deplite/app/idl/deplite"
import idl from "../idl/deplite.json"

export function getProgram(wallet: any) {
  
  const connection = new Connection(
  process.env.NEXT_PUBLIC_HELIUS_RPC!
);
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  )
  return new Program<Deplite>(idl as Deplite, provider)
}