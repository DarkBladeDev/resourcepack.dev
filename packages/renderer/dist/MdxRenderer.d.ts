import { KnowledgeObject } from '@resourcepack/schemas';
export declare class MdxRenderer {
    private contentRoot;
    constructor(contentRoot: string);
    /**
     * Reads an existing MDX file, updates its frontmatter with the new KnowledgeObject data,
     * and preserves the human-written markdown body.
     */
    renderMdx(ko: KnowledgeObject, relativePath: string): Promise<void>;
}
