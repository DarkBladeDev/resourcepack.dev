"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSchema = exports.changeTypeSchema = void 0;
const zod_1 = require("zod");
exports.changeTypeSchema = zod_1.z.enum([
    "added",
    "modified",
    "deprecated",
    "removed",
]);
exports.changeSchema = zod_1.z.object({
    version: zod_1.z.string().describe("The version where the change occurred (e.g., '1.20.5')"),
    type: exports.changeTypeSchema,
    description: zod_1.z.string().describe("A human-readable description of the change"),
});
