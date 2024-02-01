# sveltekit-io

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/cedrictailly/sveltekit-io)](https://github.com/cedrictailly/sveltekit-io/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/cedrictailly/sveltekit-io)](https://github.com/cedrictailly/sveltekit-io/pulls)

Create a Socket.io server at SvelteKit server startup and establish a connection on the client side.

## Installation

```bash
npm install sveltekit-io
```

## Basic setup

Basic example including CORS configuration : adding setup in the file `/src/hooks.js` :

```typescript
import skio from "sveltekit-io";

skio.setup('http://localhost:3001', {
  cors: {
    origin     : "http://localhost:5173",
    credentials: true,
  },
});
```

This code sets up Socket.io on both server and client sides.

## Use case example

A more advanced usage example : emitting "Hello" messages on new connections and others containing the request URL to all clients on each server request.

In file `/src/hooks.js` :

```typescript
import skio from "sveltekit-io";
import { browser } from "$app/environment";
import type { Handle } from "@sveltejs/kit";

const io = await skio.setup('http://localhost:3001', {
  cors: {
    origin     : "http://localhost:5173",
    credentials: true,
  },
})!;

if ( !browser )
{
  io.on('connect', socket => {

    socket.on('message', (message: {}) => {
      console.log(socket.id, message);
    });

    socket.emit('message', {message: 'Hello from server !'});
  });
}

export const handle: Handle = async ({ event, resolve }) => {

  if ( !browser )
    io.emit('message', {message: `New request: ${event.request.url}`} );

  return await resolve(event);
}
```

The Svelte hook `onMount()` is a way to ensure we are on the client side, so here for the file `/src/routes/+page.svelte` :

```html
<script lang="ts">

  import skio from 'sveltekit-io';
  import { onMount } from 'svelte';

  onMount(() => {

    const socket = skio.get();

    socket.on('message', (message: {}) => {
      console.log(message);
    });

    socket.emit('message', {message: 'Hello from client !'});
  });

</script>
```

## Contributing

If you encounter issues or have suggestions, feel free to [open an issue](https://github.com/cedrictailly/sveltekit-io/issues) or [create a pull request](https://github.com/cedrictailly/sveltekit-io/pulls). Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).
