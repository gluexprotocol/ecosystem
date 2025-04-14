enum ChainType {
  // Ethereum virtual machine
  EVM = "EVM",

  // Solana virtual machine
  // SVM = "SVM",

  // Cosmos
  // COSMOS = "COSMOS",

  // Unspent transaction output (eg: Bitcoin, Litecoin)
  // UTXO = "UTXO",

  // Move virtual machine
  // MVM = "MVM",

  // Fuel virtual machine
  // FUELVM = "FuelVM",
}

declare interface Chain {
  // (internal) reference to different chains in gluex internal system
  key: string;

  // chain if (if applicable)
  id: number;

  // name of the chain
  name: string;

  // defines the chain type (refer: ChainType)
  chainType: keyof typeof ChainType;

  // indicator for the chain mode (mainnet, testnet, devnet)
  mode: "mainnet" | "testnet" | "devnet";

  // logo uri of the chain
  logoURI: string;
}
