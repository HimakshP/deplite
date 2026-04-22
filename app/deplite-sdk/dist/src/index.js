import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "../../idl/deplite.json";
export function createDepliteClient(config) {
    const PROGRAM_ID = new PublicKey(config.programId);
    const ADMIN = new PublicKey(config.admin);
    const connection = new Connection(config.rpc || "https://devnet.helius-rpc.com/?api-key=521ac8a4-be7b-4f47-b49c-9cdfa9cb770f");
    const provider = new AnchorProvider(connection, {}, {});
    const program = new Program(idl, provider);
    function derivePda(flagName) {
        const [flagPda] = PublicKey.findProgramAddressSync([
            Buffer.from("feature_flag"),
            ADMIN.toBuffer(),
            Buffer.from(flagName),
        ], PROGRAM_ID);
        return flagPda;
    }
    async function get(flagName) {
        const pda = derivePda(flagName);
        try {
            const acc = await program.account.flagAccount.fetch(pda);
            return acc.enabled;
        }
        catch {
            return false;
        }
    }
    function subscribe(flagName, callback) {
        const pda = derivePda(flagName);
        const subId = connection.onAccountChange(pda, async () => {
            const val = await get(flagName);
            callback(val);
        });
        return () => {
            connection.removeAccountChangeListener(subId);
        };
    }
    return {
        get,
        subscribe,
    };
}
