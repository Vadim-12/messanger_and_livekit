"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApiServer = void 0;
const vars_1 = require("../config/vars");
const http_1 = require("../config/http");
const startApiServer = async () => {
    http_1.http.listen(vars_1.vars.port);
    console.log("HTTP started on PORT", vars_1.vars.port);
};
exports.startApiServer = startApiServer;
