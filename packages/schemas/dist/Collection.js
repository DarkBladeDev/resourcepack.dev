"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionSchema = void 0;
const zod_1 = require("zod");
exports.collectionSchema = zod_1.z.object({
    id: zod_1.z.string().describe("Permanent ID for the collection (e.g., 'collection.models.swords')"),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    items: zod_1.z.array(zod_1.z.string()).describe("Array of KnowledgeObject IDs that belong to this collection"),
});
