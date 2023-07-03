import { onConnection } from "../../services/socket/onConnection";
import { onMessage } from "../../services/socket/onMessage";
import { Router } from "../../services/socket/router";

export const socketRouter = new Router();

/*
socketRouter.addRoute(
	{
		path: "newMessage",
	},
	onMessage
);
*/
