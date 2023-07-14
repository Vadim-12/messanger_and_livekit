"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const livekit_server_sdk_1 = require("livekit-server-sdk");
const vars_1 = require("../../../config/vars");
const createToken = (userInfo, grant) => {
    const at = new livekit_server_sdk_1.AccessToken(vars_1.vars.LK_API_KEY, vars_1.vars.LK_SECRET_KEY, userInfo);
    at.addGrant(grant);
    console.log({ at: at.toJwt() });
    console.log(vars_1.vars.LK_API_KEY);
    console.log(vars_1.vars.LK_SECRET_KEY);
    return at.toJwt();
};
const getToken = async (req, res) => {
    try {
        const { name, roomName, identity, metadata } = req.query;
        if (typeof name !== 'string') {
            console.log('name', typeof name);
            throw new Error('Ошибка при выдаче токена');
        }
        if (typeof roomName !== 'string') {
            console.log(typeof roomName);
            throw new Error('Можем выдать токен только к одной комнате');
        }
        if (typeof identity !== 'string') {
            console.log(typeof identity);
            throw new Error('Можем выдать токен только для одного пользователя');
        }
        if (typeof metadata !== 'string' && typeof metadata !== 'undefined') {
            console.log('metadata', typeof metadata);
            throw new Error('Ошибка при выдаче токена');
        }
        const grant = {
            room: roomName,
            roomJoin: true,
            canPublish: true,
            canPublishData: true,
            canSubscribe: true
        };
        const token = createToken({ identity, name, metadata }, grant);
        res.json({ identity, AccessToken: token });
    }
    catch (e) {
        res.statusMessage = e.message;
        res.status(500).end();
    }
};
exports.getToken = getToken;
