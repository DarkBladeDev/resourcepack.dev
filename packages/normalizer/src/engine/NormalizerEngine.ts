import { KnowledgeObject, Relation } from "@resourcepack/schemas";
import { RawAsset } from "@resourcepack/parser";

export interface NormalizerRule {
  /** Uniquely identifies the rule */
  name: string;
  
  /** Evaluates if this rule applies to the given raw asset */
  condition(asset: RawAsset): boolean;
  
  /** Transforms the raw asset, mutating the KnowledgeObject draft */
  transform(asset: RawAsset, draft: Partial<KnowledgeObject>): void;
}

export class NormalizerEngine {
  private rules: NormalizerRule[] = [];

  registerRule(rule: NormalizerRule) {
    this.rules.push(rule);
  }

  normalize(assets: RawAsset[]): KnowledgeObject[] {
    return assets.map(asset => {
      // Create a base draft KnowledgeObject
      const draft: Partial<KnowledgeObject> = {
        relations: [],
        tags: [],
        namespaces: [],
        verification: { level: 'inferred', confidence: 0.9 }
      };

      // Apply all matching rules
      for (const rule of this.rules) {
        if (rule.condition(asset)) {
          rule.transform(asset, draft);
        }
      }

      // In a real implementation, we would validate `draft` against `knowledgeObjectSchema` here
      // to ensure the rules produced a valid object.
      return draft as KnowledgeObject;
    });
  }
}
