"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceSchema = exports.sourceTrustLevelSchema = void 0;
const zod_1 = require("zod");
exports.sourceTrustLevelSchema = zod_1.z.enum([
    "Official",
    "Community",
    "Decompiled",
]);
exports.sourceSchema = zod_1.z.object({
    id: zod_1.z.string().describe("Permanent source ID (e.g., 'source.mojang.tech_notes')"),
    name: zod_1.z.string(),
    trustLevel: exports.sourceTrustLevelSchema,
    url: zod_1.z.string().url().optional(),
    license: zod_1.z.string().optional(),
});
