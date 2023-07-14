"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onConnection_1 = require("./onConnection");
const onMessage_1 = require("./onMessage");
const onDisconnect_1 = require("./onDisconnect");
exports.default = { onConnection: onConnection_1.onConnection, onMessage: onMessage_1.onMessage, onDisconnect: onDisconnect_1.onDisconnect };
