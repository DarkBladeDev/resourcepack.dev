import { VanillaProvider } from '@resourcepack/parser';
import { NormalizerEngine } from './engine/NormalizerEngine';
import { ParentModelRule } from './rules/ParentModelRule';
import { GraphValidator } from './validator/GraphValidator';

// NOTE: We don't import MdxRenderer directly here to keep normalizer agnostic,
// but in a CLI tool (e.g. apps/cli), we would tie them together.

export async function runPipeline() {
  console.log("Starting Pipeline...");
  
  // 1. Provide Assets
  const provider = new VanillaProvider('./assets');
  const rawAssets = await provider.loadAssets();
  console.log(`Loaded ${rawAssets.length} raw assets.`);

  // 2. Normalize
  const engine = new NormalizerEngine();
  engine.registerRule(ParentModelRule);
  
  const knowledgeObjects = engine.normalize(rawAssets);
  console.log(`Normalized into ${knowledgeObjects.length} Knowledge Objects.`);

  // 3. Validate
  const validator = new GraphValidator();
  validator.validate(knowledgeObjects);
  console.log(`Validation passed.`);

  return knowledgeObjects;
}

if (require.main === module) {
  runPipeline().catch(console.error);
}
