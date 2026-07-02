# Velib

Vélib bike-sharing reservation app (Lyon) — vanilla JS + Vite + Cypress + Docker.

## Prerequisites

- [Docker](https://www.docker.com)
- [mkcert](https://github.com/FiloSottile/mkcert) — `brew install mkcert`

## Environment variables

Copy the example file and fill in your API keys:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_MAPS_KEY` | Google Maps JavaScript API key |
| `VITE_JCDECAUX_API_KEY` | JCDecaux Open Data API key |
| `VITE_JCDECAUX_CONTRACT` | JCDecaux contract name (default: `Lyon`) |

## HTTPS certificate (required for the dev server)

Vite runs over HTTPS locally. Generate a trusted self-signed certificate with mkcert:

```bash
mkcert -install
mkdir -p certs
mkcert -cert-file certs/tls.pem -key-file certs/tls.key "localhost"
```

`mkcert -install` only needs to be run once per machine.

## Development

Build the image and start the container (keeps running in the background):

```bash
docker compose up -d --build
```

Install dependencies inside the container:

```bash
docker compose exec app pnpm install
```

App available at <https://localhost:5173>. The source is mounted for hot-reload — no rebuild needed on file changes.

When adding or removing packages, run `pnpm` inside the container:

```bash
docker compose exec app pnpm add <package>
docker compose exec app pnpm remove <package>
```

## Tests

```bash
# Run Cypress (spins up, runs all specs, then exits)
docker compose --profile cypress run --rm cypress
```

## Build

```bash
docker compose exec app pnpm build
```

## Production

```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d --build
```

App served by nginx on <http://localhost:8080> with gzip compression and immutable asset caching.
