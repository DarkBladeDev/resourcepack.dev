"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TexturesRule = void 0;
/**
 * Detects if a Vanilla Model has a 'textures' map,
 * and automatically generates 'uses' Relations to those textures.
 */
exports.TexturesRule = {
    name: "VanillaTexturesRelation",
    condition: (asset) => {
        return asset.path.includes("models/") &&
            typeof asset.content?.textures === "object";
    },
    transform: (asset, draft) => {
        const textures = asset.content.textures;
        draft.relations = draft.relations || [];
        for (const [key, texturePath] of Object.entries(textures)) {
            if (typeof texturePath === 'string' && !texturePath.startsWith('#')) {
                // texturePath is usually 'item/apple' or 'block/stone'
                // Canonicalize it to minecraft.resourcepack.texture.*
                const canonicalTextureId = `minecraft.resourcepack.texture.${texturePath.replace('/', '.')}`;
                draft.relations.push({
                    from: draft.id || "unknown",
                    to: canonicalTextureId,
                    type: "uses"
                });
            }
        }
    }
};
