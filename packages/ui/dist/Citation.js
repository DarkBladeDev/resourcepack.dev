"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Citation = ({ sourceId }) => {
    return ((0, jsx_runtime_1.jsx)("sup", { className: "citation", children: (0, jsx_runtime_1.jsxs)("a", { href: `/sources/${sourceId}`, className: "text-blue-400 hover:underline cursor-pointer", title: `Cite: ${sourceId}`, children: ["[", sourceId.split('.').pop(), "]"] }) }));
};
exports.Citation = Citation;
