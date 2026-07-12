"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAssetRule = void 0;
/**
 * Ensures every raw asset gets a base KnowledgeObject structure:
 * - canonical ID
 * - type
 * - title
 */
exports.BaseAssetRule = {
    name: "BaseAssetMetadata",
    condition: (asset) => {
        return true; // Applies to everything
    },
    transform: (asset, draft) => {
        if (asset.path === 'pack.mcmeta') {
            draft.id = "minecraft.resourcepack.pack";
            draft.type = "Asset";
            draft.title = "pack.mcmeta";
            draft.description = "The metadata file for the resource pack.";
            return;
        }
        // Example paths:
        // assets/minecraft/models/item/apple.json
        // assets/minecraft/models/block/furnace.json
        // assets/minecraft/blockstates/furnace.json
        const parts = asset.path.replace('assets/minecraft/', '').replace('.json', '').split('/');
        // canonical id: minecraft.resourcepack.<type>.<category>.<name>
        // e.g. minecraft.resourcepack.model.item.apple
        const rootDir = parts[0]; // models, blockstates
        const subCategory = parts.length > 2 ? parts[1] : ''; // item, block
        const name = parts[parts.length - 1];
        if (rootDir === 'models') {
            draft.id = `minecraft.resourcepack.model.${subCategory ? subCategory + '.' : ''}${name}`;
            draft.type = "Asset";
            draft.title = `Model: ${name}`;
            draft.description = `Vanilla model definition for ${name}.`;
        }
        else if (rootDir === 'blockstates') {
            draft.id = `minecraft.resourcepack.blockstate.${name}`;
            draft.type = "Asset";
            draft.title = `Blockstate: ${name}`;
            draft.description = `Vanilla blockstate definition for ${name}.`;
        }
        draft.introducedIn = "1.0"; // Placeholder MVP
        draft.verification = { level: "official", confidence: 1.0 };
    }
};
