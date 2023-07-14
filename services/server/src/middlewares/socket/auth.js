"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (socket, next) => {
    console.log("MIDDLEWARE socket:auth");
    next();
};
exports.auth = auth;
