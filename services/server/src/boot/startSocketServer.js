"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocketServer = void 0;
const vars_1 = require("../config/vars");
const socket_1 = require("../config/socket");
const onConnection_1 = require("../services/socket/onConnection");
const onDisconnect_1 = require("../services/socket/onDisconnect");
const startSocketServer = async () => {
    socket_1.io.on("connection", onConnection_1.onConnection);
    socket_1.io.on("disconnect", onDisconnect_1.onDisconnect);
    console.log("Socket started on PORT", vars_1.vars.port);
};
exports.startSocketServer = startSocketServer;
