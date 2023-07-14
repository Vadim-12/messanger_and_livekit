"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
const parseNumber = (str, def) => {
    const num = Number(str) || def;
    return Number.isNaN(num) ? def : num;
};
exports.parseNumber = parseNumber;
