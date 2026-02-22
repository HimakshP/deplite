use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;
pub mod errors;

use instructions::*;

declare_id!("C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu");

#[program]
pub mod deplite {
    use super::*;

    pub fn initialize_flag(ctx: Context<InitializeFlag>, name: String) -> Result<()> {
        init_flag::handler(ctx, name)
    }

    pub fn toggle_flag(ctx: Context<ToggleFlag>, enabled: bool) -> Result<()> {
        toggle_flag::handler(ctx, enabled)
    }

    pub fn close_flag(ctx: Context<CloseFlag>) -> Result<()> {
        close_flag::handler(ctx)
    }
}