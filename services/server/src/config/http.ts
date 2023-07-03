import { createServer } from "http";
import { app } from "./express";

const http = createServer(app);

export { http };
