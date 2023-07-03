import { Server } from "socket.io";
import { auth } from "../middlewares/socket/auth";
import { http } from "./http";

const socketConfig = {
    pingInterval: 500,
    pingTimeout: 500,
    cors: {
        origin: "*",
    },
};

const io = new Server(http, socketConfig);

io.use(auth);

export { io };
