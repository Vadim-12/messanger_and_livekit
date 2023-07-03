import { ITime } from "./ITime";

export interface IMessage {
    id: number;
    socketID: string;
    name: string;
    text: string;
    time: ITime;
}
