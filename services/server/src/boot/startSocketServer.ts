import { vars } from "../config/vars";
import { io } from "../config/socket";
import { onConnection } from "../services/socket/onConnection";
import { onDisconnect } from "../services/socket/onDisconnect";

export const startSocketServer = async () => {
	io.on("connection", onConnection);
	io.on("disconnect", onDisconnect);
	console.log("Socket started on PORT", vars.port);
};
