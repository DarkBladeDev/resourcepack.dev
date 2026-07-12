"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProperty = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ApiProperty = ({ name, type, required = false, children }) => {
    return ((0, jsx_runtime_1.jsxs)("li", { className: "api-property", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 font-mono text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-blue-400 font-bold", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: ":" }), (0, jsx_runtime_1.jsx)("span", { className: "text-green-400", children: type }), required && (0, jsx_runtime_1.jsx)("span", { className: "text-red-400 text-xs uppercase tracking-wider ml-2 border border-red-800 rounded px-1", children: "Required" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-gray-300 mt-1 pl-4 border-l-2 border-gray-700 text-sm", children: children })] }));
};
exports.ApiProperty = ApiProperty;
