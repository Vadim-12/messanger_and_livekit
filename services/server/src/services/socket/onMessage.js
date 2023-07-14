"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const socket_1 = require("../../routes/socket");
const onMessage = (socket, message) => {
    socket_1.socketRouter.subscribe(socket);
};
exports.onMessage = onMessage;
