import { Router } from "express";
import { getConnectPermission } from "./controller";

const userRouter = Router();

userRouter.get("/permission", getConnectPermission);

export default userRouter;
