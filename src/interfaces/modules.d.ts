enum LiquidityModuleType {
  CEX = "centralized-exchange",
  DEX = "decentralized-exchange",
  POOLS = "liquidity-pools",
  LENDING = "lending-protocol",
  STAKING = "staking-protocol",
  RESTAKING = "restaking-protocol",
  YIELD = "yield-vault",
  DERIVATIVES = "derivatives",
  MINTING = "minting",
  STABLECOIN = "stablecoin",
  AMM = "automated-market-makers",
}

declare type LiquidityModules = keyof typeof LiquidityModuleType;
