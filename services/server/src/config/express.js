"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/api/users"));
const cors_1 = __importDefault(require("cors"));
const livekit_1 = __importDefault(require("../routes/api/livekit"));
const app = express_1.default();
exports.app = app;
app.use(cors_1.default({
    origin: "*",
}));
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use('/api/livekit', livekit_1.default);
