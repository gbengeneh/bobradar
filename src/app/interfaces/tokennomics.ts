export interface Tokennomics {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  txns: Transactions;
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  info: PairInfo;
  boosts: Boosts;
  labels?: string[]; // Optional property
}

interface Token {
  address: string;
  name: string;
  symbol: string;
}

interface Transactions {
  m5: TradeData;
  h1: TradeData;
  h6: TradeData;
  h24: TradeData;
}

interface TradeData {
  buys: number;
  sells: number;
}

interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface PriceChange {
  m5?: number; // Optional property
  h1?: number; // Optional property
  h6?: number; // Optional property
  h24?: number; // Optional property
}

interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

interface PairInfo {
  imageUrl: string;
  header: string;
  openGraph: string;
  websites: Website[];
  socials: Social[];
}

interface Website {
  label: string;
  url: string;
}

interface Social {
  type: string;
  url: string;
}

interface Boosts {
  active: number;
}

interface PairsResponse {
  schemaVersion: string;
  pairs: Tokennomics[];
}
