
import type { Server, ServerOptions } from 'socket.io';
import type Client from 'socket.io-client';

export interface Config {
  host: URL;
  options: ServerOptions,
}

export function setup(url: string|number|URL, options: Partial<ServerOptions> = {}): Server|Client;
export function get(): Server|Client;
export function started(): boolean;
export function getConfig(): Config;
