import { startApiServer } from "./startApiServer";
import { startSocketServer } from "./startSocketServer";

export const runBootTasks = async () => {
	await startApiServer();
	await startSocketServer();
};
