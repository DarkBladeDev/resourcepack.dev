import { NormalizerRule } from "../engine/NormalizerEngine";
import { RawAsset } from "@resourcepack/parser";
import { KnowledgeObject } from "@resourcepack/schemas";

/**
 * Ensures every raw asset gets a base KnowledgeObject structure:
 * - canonical ID
 * - type
 * - title
 */
export const BaseAssetRule: NormalizerRule = {
  name: "BaseAssetMetadata",
  
  condition: (asset: RawAsset) => {
    return true; // Applies to everything
  },
  
  transform: (asset: RawAsset, draft: Partial<KnowledgeObject>) => {
    if (asset.path === 'pack.mcmeta') {
      draft.id = "minecraft.resourcepack.pack";
      draft.type = "ResourcePack";
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
      draft.type = "Model";
      draft.title = `Model: ${name}`;
      draft.description = `Vanilla model definition for ${name}.`;
    } else if (rootDir === 'blockstates') {
      draft.id = `minecraft.resourcepack.blockstate.${name}`;
      draft.type = "Blockstate";
      draft.title = `Blockstate: ${name}`;
      draft.description = `Vanilla blockstate definition for ${name}.`;
    }

    draft.introducedIn = "1.0"; // Placeholder MVP
    draft.verification = { level: "official", confidence: 1.0 };
  }
};
