"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const auth_1 = require("../middlewares/socket/auth");
const http_1 = require("./http");
const socketConfig = {
    pingInterval: 500,
    pingTimeout: 500,
    cors: {
        origin: "*",
    },
};
const io = new socket_io_1.Server(http_1.http, socketConfig);
exports.io = io;
io.use(auth_1.auth);
