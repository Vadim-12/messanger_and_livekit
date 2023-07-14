"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDisconnect = void 0;
const users_1 = require("../../db/users");
const onDisconnect = (socket) => {
    users_1.users.delete(socket.id);
};
exports.onDisconnect = onDisconnect;
