"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length) => {
    if (!length) {
        return crypto_1.default.randomUUID();
    }
    let res = '';
    while (res.length !== length) {
        const guid = crypto_1.default.randomUUID();
        if (guid.length + res.length > length) {
            res += guid.substring(0, length - res.length);
        }
        else {
            res += guid;
        }
    }
    return res;
};
exports.generateRandomString = generateRandomString;
