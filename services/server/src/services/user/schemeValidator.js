"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
const joi_1 = __importDefault(require("joi"));
const hello_1 = require("../../const/hello");
const name = () => joi_1.default.string().max(hello_1.NAME_MAX_LENGTH);
exports.name = name;
