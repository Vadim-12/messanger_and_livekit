"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const parseJson = (str, def) => {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return def;
    }
};
exports.parseJson = parseJson;
