export interface RawAsset {
  path: string;
  content: any;
}

export interface AssetProvider {
  /** The name of the provider (e.g., 'vanilla', 'oraxen') */
  name: string;
  
  /** Fetches or reads the raw assets from a source */
  loadAssets(): Promise<RawAsset[]>;
}
