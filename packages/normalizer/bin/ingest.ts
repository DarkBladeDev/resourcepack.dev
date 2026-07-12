import { VanillaProvider } from '@resourcepack/parser';
import { NormalizerEngine, BaseAssetRule, ParentModelRule, TexturesRule } from '../src/index';
import { GraphValidator } from '../src/validator/GraphValidator';
import { MdxRenderer } from '@resourcepack/renderer';
import path from 'path';

async function main() {
  console.log("Starting Full Vanilla Ingestion Pipeline...");
  
  // 1. Fetch Assets
  const provider = new VanillaProvider('1.21.4');
  const rawAssets = await provider.loadAssets();
  
  // 2. Normalize
  console.log("Normalizing...");
  const engine = new NormalizerEngine();
  engine.registerRule(BaseAssetRule);
  engine.registerRule(ParentModelRule);
  engine.registerRule(TexturesRule);
  
  const knowledgeObjects = engine.normalize(rawAssets);
  
  // 3. Validate
  console.log("Validating Graph...");
  const validator = new GraphValidator();
  validator.validate(knowledgeObjects);
  
  // 4. Render MDX
  console.log("Generating MDX Files...");
  // Path to packages/knowledge/src/minecraft/resourcepack
  const knowledgeBaseRoot = path.join(process.cwd(), '../../packages/knowledge/src/minecraft/resourcepack');
  const renderer = new MdxRenderer(knowledgeBaseRoot);
  
  let count = 0;
  for (const obj of knowledgeObjects) {
    if (!obj.id) continue;
    
    // Determine path based on ID
    // e.g., minecraft.resourcepack.model.item.apple -> models/item/apple.mdx
    const relativePath = obj.id.replace('minecraft.resourcepack.', '').replace(/\./g, '/') + '.mdx';
    
    await renderer.renderMdx(obj, relativePath);
    count++;
    
    // Progress indicator
    if (count % 500 === 0) {
      console.log(`Rendered ${count} files...`);
    }
  }
  
  console.log(`\nSuccess! Generated/Updated ${count} Knowledge Objects.`);
}

main().catch(console.error);
