"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountOfUsers = void 0;
const users_1 = require("../../db/users");
const getCountOfUsers = async () => {
    const response = {
        count: users_1.users.size,
    };
    return response;
};
exports.getCountOfUsers = getCountOfUsers;
