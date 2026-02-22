use anchor_lang::prelude::*;

#[error_code]
pub enum FeatureFlagError {
    #[msg("Unauthorized access")]
    Unauthorized,

    #[msg("Flag name too long")]
    NameTooLong,
}