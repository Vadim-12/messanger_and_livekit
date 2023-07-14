"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBootTasks = void 0;
const startApiServer_1 = require("./startApiServer");
const startSocketServer_1 = require("./startSocketServer");
const runBootTasks = async () => {
    await startApiServer_1.startApiServer();
    await startSocketServer_1.startSocketServer();
};
exports.runBootTasks = runBootTasks;
