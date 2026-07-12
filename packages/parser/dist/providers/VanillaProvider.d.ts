import { AssetProvider, RawAsset } from './AssetProvider';
export declare class VanillaProvider implements AssetProvider {
    private version;
    name: string;
    constructor(version?: string);
    loadAssets(): Promise<RawAsset[]>;
}
