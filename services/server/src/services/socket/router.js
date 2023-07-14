"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const emptyFunction_1 = require("../../utils/function/emptyFunction");
class Router {
    constructor() {
        this.routes = [];
        this.routers = [];
    }
    addRoute({ path, log = false, disconnectOnError = false, }, ...fns) {
        this.routes.push({
            path,
            log,
            fns,
            disconnectOnError,
        });
    }
    addRouter(path, router) {
        this.routers.push({
            path,
            router,
        });
    }
    subscribe(socket, { path } = {}) {
        this.routes.map((r) => {
            const p = path?.length ? `${path}:${r.path}` : r.path;
            // todo
            // const isDisconnect = p.endsWith(':disconnect');
            // const routePath = isDisconnect ? 'disconnect' : p;
            // socket.on(routePath, async (data: any, cb: ICbFn = emptyFunction) => {
            socket.on(p, async (data, cb = emptyFunction_1.emptyFunction) => {
                try {
                    let res;
                    for (let i = 0; i < r.fns.length; i++) {
                        // eslint-disable-next-line no-await-in-loop
                        res = await r.fns[i](socket, data);
                    }
                    cb(undefined, res);
                }
                catch (e) {
                    if (r.disconnectOnError) {
                        socket.disconnect();
                    }
                    else {
                        cb(e);
                    }
                }
            });
        });
        this.routers.map((r) => {
            const p = path?.length ? `${path}:${r.path}` : r.path;
            r.router.subscribe(socket, { path: p });
        });
    }
}
exports.Router = Router;
