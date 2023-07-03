import { Socket } from "socket.io";
import { socketRouter } from "../../routes/socket";

export const onMessage = (socket: Socket, message: string) => {
	socketRouter.subscribe(socket);
};
