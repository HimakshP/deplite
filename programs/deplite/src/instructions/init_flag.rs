use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeFlag<'info> {
    #[account(
        init,
        payer = admin,
        space = FlagAccount::LEN,
        seeds = [b"feature_flag", admin.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub flag: Account<'info, FlagAccount>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeFlag>, name: String) -> Result<()> {
    require!(
        name.len() <= FlagAccount::MAX_NAME_LEN,
        FeatureFlagError::NameTooLong
    );

    let flag = &mut ctx.accounts.flag;

    flag.admin = ctx.accounts.admin.key();
    flag.enabled = false;
    flag.bump = ctx.bumps.flag;
    flag.name = name;

    Ok(())
}