use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct CloseFlag<'info> {
    #[account(
        mut,
        close = admin,
        seeds = [b"feature_flag", flag.admin.as_ref(), flag.name.as_bytes()],
        bump = flag.bump
    )]
    pub flag: Account<'info, FlagAccount>,

    #[account(mut)]
    pub admin: Signer<'info>,
}

pub fn handler(ctx: Context<CloseFlag>) -> Result<()> {
    let flag = &ctx.accounts.flag;

    require!(
        ctx.accounts.admin.key() == flag.admin,
        FeatureFlagError::Unauthorized
    );

    Ok(())
}