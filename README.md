# react-ssr-esbuild

An example implementation of full SSR support. Built with esbuild.

## Local development

First, install dependencies with `yarn`.

### Watch mode

```
yarn watch
```

This will start esbuild in watch mode for both client and server.

- Server: http://localhost:3000
- Client: http://localhost:8000

The app is at http://localhost:3000, and assets are served on port 8000.

### Build

```
yarn build
```

- Server is built to `build/`
- Client is built to `dist/`

