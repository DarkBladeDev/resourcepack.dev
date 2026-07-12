import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { KnowledgeObject } from '@resourcepack/schemas';
import yaml from 'yaml';

export class MdxRenderer {
  constructor(private contentRoot: string) {}

  /**
   * Reads an existing MDX file, updates its frontmatter with the new KnowledgeObject data,
   * and preserves the human-written markdown body.
   */
  async renderMdx(ko: KnowledgeObject, relativePath: string): Promise<void> {
    const fullPath = path.join(this.contentRoot, relativePath);
    
    let existingBody = '\n\n// TODO: Write documentation body here.\n';
    let existingFrontmatter = {};

    try {
      // Try to read existing file to preserve human content
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      const parsed = matter(fileContent);
      existingBody = parsed.content;
      existingFrontmatter = parsed.data;
    } catch (e) {
      // File doesn't exist yet, we'll create it
    }

    // Merge existing frontmatter with generated KO data
    // Pipeline has authority over KO data, but might want to preserve some manual metadata if needed.
    // For MVP, we completely overwrite frontmatter with the KO representation.
    const newFrontmatterStr = yaml.stringify(ko);

    const newFileContent = `---\n${newFrontmatterStr}---\n${existingBody}`;

    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, newFileContent, 'utf-8');
  }
}
