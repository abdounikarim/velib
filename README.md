# Velib

Vélib bike-sharing reservation app (Lyon) — vanilla JS + Vite + Cypress.

## Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [pnpm](https://pnpm.io) — `npm install -g pnpm`
- [mkcert](https://github.com/FiloSottile/mkcert) — `brew install mkcert`

## Installation

```sh
pnpm install
```

## HTTPS certificate (required for the dev server)

Vite runs over HTTPS locally. Generate a trusted self-signed certificate with mkcert:

```sh
mkcert -install
mkdir -p certs
mkcert -cert-file certs/tls.pem -key-file certs/tls.key "localhost"
```

`mkcert -install` only needs to be run once per machine.

## Development

```sh
pnpm dev
```

App available at <https://localhost:5173>.

## Tests

```sh
# Headless (requires the dev server to be running)
pnpm test:e2e

# Interactive Cypress UI
pnpm test:e2e:open
```

## Build

```sh
pnpm build    # production build → dist/
pnpm preview  # preview the build locally
```
