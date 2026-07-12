import { AssetProvider, RawAsset } from './AssetProvider';
import AdmZip from 'adm-zip';
import fs from 'fs/promises';
import path from 'path';

export class VanillaProvider implements AssetProvider {
  name = 'vanilla';

  constructor(private version: string = '1.21.4') {}

  async loadAssets(): Promise<RawAsset[]> {
    console.log(`[VanillaProvider] Fetching version manifest...`);
    const manifestRes = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json');
    const manifest = await manifestRes.json() as any;

    const versionMeta = manifest.versions.find((v: any) => v.id === this.version);
    if (!versionMeta) {
      throw new Error(`Version ${this.version} not found in manifest.`);
    }

    console.log(`[VanillaProvider] Fetching package for ${this.version}...`);
    const packageRes = await fetch(versionMeta.url);
    const packageData = await packageRes.json() as any;

    const clientUrl = packageData.downloads.client.url;
    
    // We will download to a temporary file
    const tempJarPath = path.join(process.cwd(), '.temp_client.jar');
    
    console.log(`[VanillaProvider] Downloading client.jar from ${clientUrl} (this may take a minute)...`);
    const clientRes = await fetch(clientUrl);
    const arrayBuffer = await clientRes.arrayBuffer();
    
    await fs.writeFile(tempJarPath, Buffer.from(arrayBuffer));

    console.log(`[VanillaProvider] Extracting assets from jar...`);
    const zip = new AdmZip(tempJarPath);
    const zipEntries = zip.getEntries();
    
    const assets: RawAsset[] = [];

    for (const entry of zipEntries) {
      // We only care about assets/minecraft/models and assets/minecraft/blockstates for this MVP
      const entryName = entry.entryName;
      if (!entry.isDirectory && entryName.endsWith('.json')) {
        if (entryName.startsWith('assets/minecraft/models/') || entryName.startsWith('assets/minecraft/blockstates/')) {
          try {
            const contentString = entry.getData().toString('utf8');
            const content = JSON.parse(contentString);
            assets.push({
              path: entryName,
              content
            });
          } catch (e) {
            console.warn(`[VanillaProvider] Failed to parse ${entryName}`);
          }
        }
      }
    }

    // Add a mocked pack.mcmeta since it's usually at the root of the jar but let's just mock it for MVP simplicity
    // or try to read it if it exists
    const mcmetaEntry = zip.getEntry('pack.mcmeta');
    if (mcmetaEntry) {
      try {
        assets.push({
          path: 'pack.mcmeta',
          content: JSON.parse(mcmetaEntry.getData().toString('utf8'))
        });
      } catch (e) {
        console.warn(`[VanillaProvider] Failed to parse pack.mcmeta`);
      }
    }

    console.log(`[VanillaProvider] Cleanup temp jar...`);
    await fs.unlink(tempJarPath);

    console.log(`[VanillaProvider] Extracted ${assets.length} JSON assets.`);
    return assets;
  }
}
