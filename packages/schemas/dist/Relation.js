"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationSchema = exports.relationTypeSchema = void 0;
const zod_1 = require("zod");
exports.relationTypeSchema = zod_1.z.enum([
    "depends_on",
    "uses",
    "extends",
    "parent_of",
    "child_of",
    "implements",
    "related",
]);
exports.relationSchema = zod_1.z.object({
    from: zod_1.z.string().describe("The ID of the source KnowledgeObject"),
    to: zod_1.z.string().describe("The ID of the target KnowledgeObject"),
    type: exports.relationTypeSchema,
});
