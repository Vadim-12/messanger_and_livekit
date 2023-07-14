"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const http_1 = require("http");
const express_1 = require("./express");
const http = http_1.createServer(express_1.app);
exports.http = http;
