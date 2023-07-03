import { IRouteFn } from "../../../types/socket";

export const connect: IRouteFn = async (socket, data) => {
	// logic in connect by sockets
	const response = {
		status: "OK",
	};
	return response;
};
