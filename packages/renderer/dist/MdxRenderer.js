"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdxRenderer = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const yaml_1 = __importDefault(require("yaml"));
class MdxRenderer {
    contentRoot;
    constructor(contentRoot) {
        this.contentRoot = contentRoot;
    }
    /**
     * Reads an existing MDX file, updates its frontmatter with the new KnowledgeObject data,
     * and preserves the human-written markdown body.
     */
    async renderMdx(ko, relativePath) {
        const fullPath = path_1.default.join(this.contentRoot, relativePath);
        let existingBody = '\n\n// TODO: Write documentation body here.\n';
        let existingFrontmatter = {};
        try {
            // Try to read existing file to preserve human content
            const fileContent = await promises_1.default.readFile(fullPath, 'utf-8');
            const parsed = (0, gray_matter_1.default)(fileContent);
            existingBody = parsed.content;
            existingFrontmatter = parsed.data;
        }
        catch (e) {
            // File doesn't exist yet, we'll create it
        }
        // Merge existing frontmatter with generated KO data
        // Pipeline has authority over KO data, but might want to preserve some manual metadata if needed.
        // For MVP, we completely overwrite frontmatter with the KO representation.
        const newFrontmatterStr = yaml_1.default.stringify(ko);
        const newFileContent = `---\n${newFrontmatterStr}---\n${existingBody}`;
        // Ensure directory exists
        await promises_1.default.mkdir(path_1.default.dirname(fullPath), { recursive: true });
        await promises_1.default.writeFile(fullPath, newFileContent, 'utf-8');
    }
}
exports.MdxRenderer = MdxRenderer;
