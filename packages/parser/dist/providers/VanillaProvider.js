"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanillaProvider = void 0;
const adm_zip_1 = __importDefault(require("adm-zip"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class VanillaProvider {
    version;
    name = 'vanilla';
    constructor(version = '1.21.4') {
        this.version = version;
    }
    async loadAssets() {
        console.log(`[VanillaProvider] Fetching version manifest...`);
        const manifestRes = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json');
        const manifest = await manifestRes.json();
        const versionMeta = manifest.versions.find((v) => v.id === this.version);
        if (!versionMeta) {
            throw new Error(`Version ${this.version} not found in manifest.`);
        }
        console.log(`[VanillaProvider] Fetching package for ${this.version}...`);
        const packageRes = await fetch(versionMeta.url);
        const packageData = await packageRes.json();
        const clientUrl = packageData.downloads.client.url;
        // We will download to a temporary file
        const tempJarPath = path_1.default.join(process.cwd(), '.temp_client.jar');
        console.log(`[VanillaProvider] Downloading client.jar from ${clientUrl} (this may take a minute)...`);
        const clientRes = await fetch(clientUrl);
        const arrayBuffer = await clientRes.arrayBuffer();
        await promises_1.default.writeFile(tempJarPath, Buffer.from(arrayBuffer));
        console.log(`[VanillaProvider] Extracting assets from jar...`);
        const zip = new adm_zip_1.default(tempJarPath);
        const zipEntries = zip.getEntries();
        const assets = [];
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
                    }
                    catch (e) {
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
            }
            catch (e) {
                console.warn(`[VanillaProvider] Failed to parse pack.mcmeta`);
            }
        }
        console.log(`[VanillaProvider] Cleanup temp jar...`);
        await promises_1.default.unlink(tempJarPath);
        console.log(`[VanillaProvider] Extracted ${assets.length} JSON assets.`);
        return assets;
    }
}
exports.VanillaProvider = VanillaProvider;
