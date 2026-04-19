import { AnchorProvider, Program } from "@coral-xyz/anchor"
import { Connection } from "@solana/web3.js"
import { Deplite } from "/home/himax/code/deplite/app/idl/deplite"
import idl from "../idl/deplite.json"

export function getProgram(wallet: any) {
  
  const connection = new Connection("https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f")
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  )
  return new Program<Deplite>(idl as Deplite, provider)
}