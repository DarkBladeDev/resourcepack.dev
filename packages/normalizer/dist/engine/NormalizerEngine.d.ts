import { KnowledgeObject } from "@resourcepack/schemas";
import { RawAsset } from "@resourcepack/parser";
export interface NormalizerRule {
    /** Uniquely identifies the rule */
    name: string;
    /** Evaluates if this rule applies to the given raw asset */
    condition(asset: RawAsset): boolean;
    /** Transforms the raw asset, mutating the KnowledgeObject draft */
    transform(asset: RawAsset, draft: Partial<KnowledgeObject>): void;
}
export declare class NormalizerEngine {
    private rules;
    registerRule(rule: NormalizerRule): void;
    normalize(assets: RawAsset[]): KnowledgeObject[];
}
