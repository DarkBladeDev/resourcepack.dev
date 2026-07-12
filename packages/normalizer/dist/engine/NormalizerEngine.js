"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizerEngine = void 0;
class NormalizerEngine {
    rules = [];
    registerRule(rule) {
        this.rules.push(rule);
    }
    normalize(assets) {
        return assets.map(asset => {
            // Create a base draft KnowledgeObject
            const draft = {
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
            return draft;
        });
    }
}
exports.NormalizerEngine = NormalizerEngine;
