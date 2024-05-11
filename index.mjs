
import client from "socket.io-client";

let server   = null;
let instance = null;
let config   = null;

export function getConfig() { return config ? {...config} : null; }
export function started()   { return !!instance; }

export async function setup(host, options = {}) {

  if (started())
    await close();

  if (typeof host == "number")
    host = `http://localhost:${host}`;

  config = {
    host   : new URL(host),
    options: {...options},
  };

  if (typeof window  !== "undefined")
    return instance = client(config.host.href);

  const {createServer} = await import("http");
  const {Server}       = await import("socket.io");

  server   = createServer();
  instance = new Server(server, config.options);

  return await new Promise((resolve, reject) => {
    server.listen(config.host.port, config.host.hostname, () => {
      resolve(instance);
    });
  });
}

export function get() {
  return instance;
}

export function close() {

  if (!instance)
    return;

  if (server) {
    server.close();
    server = null;
  }

  instance = null;
}

export default {
  getConfig,
  started,
  setup,
  get,
  close,
};
