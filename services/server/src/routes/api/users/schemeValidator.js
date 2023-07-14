"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.world = void 0;
const joi_1 = __importDefault(require("joi"));
const schemeValidator_1 = require("../../../services/socket/schemeValidator");
const schemeValidator_2 = require("../../../services/user/schemeValidator");
exports.world = schemeValidator_1.schemeValidator(joi_1.default.object({
    name: schemeValidator_2.name(),
}));
