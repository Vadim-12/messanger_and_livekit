import { Router } from "express";
import { getToken } from "./controller";

const livekitRouter = Router();

livekitRouter.get("/token", getToken);

export default livekitRouter;
