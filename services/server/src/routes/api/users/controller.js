"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectPermission = void 0;
const permission_1 = require("../../../services/user/permission");
const getConnectPermission = async (req, res) => {
    const { count } = await permission_1.getCountOfUsers();
    const response = {
        permission: count < 4,
    };
    res.json(response);
};
exports.getConnectPermission = getConnectPermission;
