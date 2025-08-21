interface Metadata {
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
}

interface File {
  uri: string;
  cdn_uri: string;
  mime: string;
}

interface Links {
  image: string;
}

interface Content {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
}

interface Authority {
  address: string;
  scopes: string[];
}

interface Royalty {
  royalty_model: string;
  target: string | null;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

interface Creator {
  address: string;
  share: number;
  verified: boolean;
}

interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: string | null;
  ownership_model: string;
  owner: string;
}

interface TokenInfo {
  supply: number;
  decimals: number;
  token_program: string;
}

interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

export interface TokenDetails {
  interface: string;
  id: string;
  content: Content;
  authorities: Authority[];
  compression: Compression;
  grouping: any[];
  royalty: Royalty;
  creators: Creator[];
  ownership: Ownership;
  supply: number | null;
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
}
