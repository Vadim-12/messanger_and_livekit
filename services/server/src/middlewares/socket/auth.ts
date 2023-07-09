import { Socket } from "socket.io";
import { INextFn } from "../../types/socket";

export const auth = (socket: Socket, next: INextFn) => {
	console.log("MIDDLEWARE socket:auth");
	next();
};
