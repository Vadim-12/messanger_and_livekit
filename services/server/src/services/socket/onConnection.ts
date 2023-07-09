import { Socket } from "socket.io";
import { socketRouter } from "../../routes/socket";
import { users } from "../../db/users";
import { messages } from "../../db/messages";
import { IMessage } from "../../types/IMessage";

export const onConnection = (socket: Socket) => {
    socket.on("disconnect", () => {
        users.delete(socket.id);
        if (users.size === 0) {
            messages.length = 0;
        }
    });

    socket.on("newMessage", (newMessage: IMessage) => {
        messages.push(newMessage);
        socket.broadcast.emit("newMessage", newMessage);
    });

    users.set(socket.id, socket);
    socket.emit("prevMessages", messages);
    socketRouter.subscribe(socket);
};
