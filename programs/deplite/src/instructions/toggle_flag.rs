use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct ToggleFlag<'info> {
    #[account(
        mut,
        seeds = [b"feature_flag", flag.admin.as_ref(), flag.name.as_bytes()],
        bump = flag.bump
    )]
    pub flag: Account<'info, FlagAccount>,

    pub admin: Signer<'info>,
}

pub fn handler(ctx: Context<ToggleFlag>, enabled: bool) -> Result<()> {
    let flag = &mut ctx.accounts.flag;

    require!(
        ctx.accounts.admin.key() == flag.admin,
        FeatureFlagError::Unauthorized
    );

    flag.enabled = enabled;

    Ok(())
}