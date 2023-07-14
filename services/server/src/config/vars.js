"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const parseBoolean_1 = require("../utils/parsers/parseBoolean");
const parseNumber_1 = require("../utils/parsers/parseNumber");
const parseString_1 = require("../utils/parsers/parseString");
dotenv_1.default.config();
exports.vars = {
    env: parseString_1.parseString(process.env.NODE_ENV, 'develop'),
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    isLocal: parseBoolean_1.parseBoolean(process.env.IS_LOCAL, false),
    port: parseNumber_1.parseNumber(process.env.PORT, 5001),
    LK_API_KEY: parseString_1.parseString(process.env.LK_API_KEY, 'devkey'),
    LK_SECRET_KEY: parseString_1.parseString(process.env.LK_SECRET_KEY, 'secret')
};
