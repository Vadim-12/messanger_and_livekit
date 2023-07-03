import { Socket } from "socket.io";
import { users } from "../../db/users";

export const onDisconnect = (socket: Socket) => {
	users.delete(socket.id);
};
