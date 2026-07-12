import { NormalizerRule } from "../engine/NormalizerEngine";
import { RawAsset } from "@resourcepack/parser";
import { KnowledgeObject } from "@resourcepack/schemas";

/**
 * Example Rule: Detects if a Vanilla Item Model has a 'parent' property,
 * and automatically generates an 'extends' Relation.
 */
export const ParentModelRule: NormalizerRule = {
  name: "VanillaParentModelRelation",
  
  condition: (asset: RawAsset) => {
    // Check if it's a vanilla model json containing a 'parent' string
    return asset.path.includes("models/") && 
           typeof asset.content?.parent === "string";
  },
  
  transform: (asset: RawAsset, draft: Partial<KnowledgeObject>) => {
    const parentStr = asset.content.parent as string;
    
    // Canonicalize the parent ID (e.g., 'item/generated' -> 'minecraft.resourcepack.model.item.generated')
    // Naive canonicalization for MVP
    const canonicalParentId = `minecraft.resourcepack.model.${parentStr.replace('/', '.')}`;
    
    draft.relations = draft.relations || [];
    draft.relations.push({
      from: draft.id || "unknown", // draft.id should be set by another base rule
      to: canonicalParentId,
      type: "extends"
    });
  }
};
