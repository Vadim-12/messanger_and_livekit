"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const boot_1 = require("./boot");
async function start() {
    await boot_1.runBootTasks();
}
start().catch((e) => {
    process_1.default.exit();
});
