const chainColors = {
  arbitrum: "bg-sky-500/20 text-sky-300",
  optimism: "bg-rose-600/20 text-rose-300",
  base: "bg-blue-600/20 text-blue-300",
  linea: "bg-emerald-400/20 text-emerald-200",
  scroll: "bg-orange-500/20 text-orange-300",
  blast: "bg-yellow-500/20 text-yellow-300",
  mantle: "bg-pink-500/20 text-pink-300",
  mainnet: "bg-neutral-500/20 text-neutral-300",
  bnb: "bg-yellow-400/20 text-yellow-200",
  polygon: "bg-fuchsia-500/20 text-fuchsia-300",
  avalanche: "bg-rose-500/20 text-rose-300",
  gnosis: "bg-teal-500/20 text-teal-300",
  sei: "bg-indigo-500/20 text-indigo-300",
  manta: "bg-cyan-500/20 text-cyan-300",
  sonic: "bg-brown-600/50 text-brown-200",
  hyperevm: "bg-lime-500/20 text-lime-300",
  soneium: "bg-violet-500/20 text-violet-300",
  unichain: "bg-pink-400/20 text-pink-200",
  berachain: "bg-amber-950/20 text-white",
  taiko: "bg-pink-500/20 text-pink-300",
};

export const getChainColor = (chain: keyof typeof chainColors) => {
  const color = chainColors[chain];
  const fallback = "bg-gray-500/20 text-gray-300";
  return color ? color : fallback;
};
