import { Socket } from 'socket.io';
import { ICbFn, IRouteFn } from '../../types/socket';
import { emptyFunction } from '../../utils/function/emptyFunction';

export class Router {
  private routes: {
    path: string;
    log: boolean;
    disconnectOnError: boolean;
    fns: IRouteFn[];
  }[];

  private routers: {
    path: string;
    router: Router;
  }[];

  constructor() {
    this.routes = [];
    this.routers = [];
  }

  addRoute({
    path,
    log = false,
    disconnectOnError = false,
  }: {
    path: string;
    log?: boolean;
    disconnectOnError?: boolean;
  }, ...fns: IRouteFn[]) {
    this.routes.push({
      path,
      log,
      fns,
      disconnectOnError,
    });
  }

  addRouter(path: string, router: Router) {
    this.routers.push({
      path,
      router,
    });
  }

  subscribe(socket: Socket, { path }: { path?: string } = {}) {
    
    this.routes.map((r) => {
      const p = path?.length ? `${path}:${r.path}` : r.path;
      // todo
      // const isDisconnect = p.endsWith(':disconnect');
      // const routePath = isDisconnect ? 'disconnect' : p;
      // socket.on(routePath, async (data: any, cb: ICbFn = emptyFunction) => {
      socket.on(p, async (data: any, cb: ICbFn = emptyFunction) => {
        try {
          let res;
          for (let i = 0; i < r.fns.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            res = await r.fns[i](socket, data);
          }
          cb(undefined, res);
        } catch (e: any) {
          if (r.disconnectOnError) {
            socket.disconnect();
          } else {
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