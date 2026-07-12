"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanillaBlockstateSchema = exports.vanillaModelSchema = exports.vanillaPackMcmetaSchema = void 0;
const zod_1 = require("zod");
// MVP Vanilla Asset Schemas
exports.vanillaPackMcmetaSchema = zod_1.z.object({
    pack: zod_1.z.object({
        pack_format: zod_1.z.number(),
        description: zod_1.z.union([zod_1.z.string(), zod_1.z.any()]), // Can be string or rawtext
        supported_formats: zod_1.z.any().optional(),
    })
});
exports.vanillaModelSchema = zod_1.z.object({
    parent: zod_1.z.string().optional(),
    ambientocclusion: zod_1.z.boolean().optional(),
    display: zod_1.z.record(zod_1.z.any()).optional(),
    textures: zod_1.z.record(zod_1.z.string()).optional(),
    elements: zod_1.z.array(zod_1.z.any()).optional(),
});
exports.vanillaBlockstateSchema = zod_1.z.object({
    variants: zod_1.z.record(zod_1.z.any()).optional(),
    multipart: zod_1.z.array(zod_1.z.any()).optional(),
});
