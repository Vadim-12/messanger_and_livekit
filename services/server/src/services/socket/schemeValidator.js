"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemeValidator = void 0;
const schemeValidator = (scheme) => (async (socket, data) => {
    const result = scheme.validate(data);
    if (result.error) {
        throw result.error;
    }
});
exports.schemeValidator = schemeValidator;
