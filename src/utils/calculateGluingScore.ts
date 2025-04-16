export const calculateGluingScore = (
  tradeVolume: number,
  tvl: number,
  numberOfChains: number
) => {
  const numericTradeVolume = tradeVolume ? Number(tradeVolume ?? 0) : 0;
  const numericTvl = tvl ? Number(tvl ?? 0) : 0;
  const numericNumberOfChains = numberOfChains
    ? Number(numberOfChains ?? 0)
    : 0;

  return numericTradeVolume * numericTvl * numericNumberOfChains;
};  
