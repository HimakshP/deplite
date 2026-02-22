use anchor_lang::prelude::*;

#[account]
pub struct FlagAccount {
    pub admin: Pubkey,     // 32
    pub enabled: bool,     // 1
    pub bump: u8,          // 1
    pub name: String,      // 4 + 32 (max 32 chars)
}

impl FlagAccount {
    pub const MAX_NAME_LEN: usize = 32;

    pub const LEN: usize =
        8 + // discriminator
        32 + // admin
        1 + // enabled
        1 + // bump
        4 + Self::MAX_NAME_LEN; // string prefix + chars
}