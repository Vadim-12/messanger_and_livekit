import express from "express";
import userRouter from "../routes/api/users";
import cors from "cors";
import livekitRouter from "../routes/api/livekit";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use("/api/users", userRouter);
app.use('/api/livekit', livekitRouter);

export { app };
