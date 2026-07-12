"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchema = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const JsonSchema = ({ children }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "json-schema-container border border-gray-700 rounded-lg p-4 bg-gray-900 my-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-2", children: "JSON Structure" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-4", children: children })] }));
};
exports.JsonSchema = JsonSchema;
