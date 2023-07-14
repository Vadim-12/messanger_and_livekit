"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnection = void 0;
const socket_1 = require("../../routes/socket");
const users_1 = require("../../db/users");
const messages_1 = require("../../db/messages");
const onConnection = (socket) => {
    socket.on("disconnect", () => {
        users_1.users.delete(socket.id);
        if (users_1.users.size === 0) {
            messages_1.messages.length = 0;
        }
    });
    socket.on("newMessage", (newMessage) => {
        messages_1.messages.push(newMessage);
        socket.broadcast.emit("newMessage", newMessage);
    });
    users_1.users.set(socket.id, socket);
    socket.emit("prevMessages", messages_1.messages);
    socket_1.socketRouter.subscribe(socket);
};
exports.onConnection = onConnection;
