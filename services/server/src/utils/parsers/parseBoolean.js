"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = void 0;
const parseBoolean = (str, def) => {
    if (!str && str?.length === 0) {
        return def;
    }
    return ['true', '1'].includes(str);
};
exports.parseBoolean = parseBoolean;
