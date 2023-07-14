"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const livekitRouter = express_1.Router();
livekitRouter.get("/token", controller_1.getToken);
exports.default = livekitRouter;
