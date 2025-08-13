
import type { Server, ServerOptions } from 'socket.io';
import type { Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

export type ClientOptions    = ManagerOptions & SocketOptions;
export type FullstackOptions = Partial<ServerOptions> | Partial<ClientOptions>;

export interface Config {
  host: URL;
  options: FullstackOptions;
}

export declare function setup(url: string | number | URL, options?: FullstackOptions): Promise<Server | Socket>;
export declare function get(): Server | Socket | null;
export declare function started(): boolean;
export declare function getConfig(): Config | null;

declare const _default: {
  setup: typeof setup;
  get: typeof get;
  started: typeof started;
  getConfig: typeof getConfig;
};

export default _default;
