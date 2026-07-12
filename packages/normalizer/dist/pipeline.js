"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPipeline = runPipeline;
const parser_1 = require("@resourcepack/parser");
const NormalizerEngine_1 = require("./engine/NormalizerEngine");
const ParentModelRule_1 = require("./rules/ParentModelRule");
const GraphValidator_1 = require("./validator/GraphValidator");
// NOTE: We don't import MdxRenderer directly here to keep normalizer agnostic,
// but in a CLI tool (e.g. apps/cli), we would tie them together.
async function runPipeline() {
    console.log("Starting Pipeline...");
    // 1. Provide Assets
    const provider = new parser_1.VanillaProvider('./assets');
    const rawAssets = await provider.loadAssets();
    console.log(`Loaded ${rawAssets.length} raw assets.`);
    // 2. Normalize
    const engine = new NormalizerEngine_1.NormalizerEngine();
    engine.registerRule(ParentModelRule_1.ParentModelRule);
    const knowledgeObjects = engine.normalize(rawAssets);
    console.log(`Normalized into ${knowledgeObjects.length} Knowledge Objects.`);
    // 3. Validate
    const validator = new GraphValidator_1.GraphValidator();
    validator.validate(knowledgeObjects);
    console.log(`Validation passed.`);
    return knowledgeObjects;
}
if (require.main === module) {
    runPipeline().catch(console.error);
}
