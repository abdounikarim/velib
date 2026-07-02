# Velib

Vélib bike-sharing reservation app (Lyon) — vanilla JS + Vite + Cypress + Docker.

## Prerequisites

- [Docker](https://www.docker.com)
- [mkcert](https://github.com/FiloSottile/mkcert) — `brew install mkcert`
- [Task](https://taskfile.dev) — `brew install go-task`

## First-time setup

```bash
task install
```

This single command:
1. Generates a trusted HTTPS certificate via mkcert (skipped if certs already exist)
2. Builds the Docker image and starts the dev container
3. Installs dependencies inside the container
4. Runs an interactive setup wizard that asks for your map provider, UI framework, city contract, and API keys — then writes `.env` and installs any extra dependencies

App available at <https://localhost:5173>.

## Available tasks

```
task install       Bootstrap the project (first-time setup, runs interactive wizard)
task install:prod  Bootstrap for production (copy .env + start nginx container)

task setup        Run the interactive setup wizard (writes .env, installs extra deps)
task env          Copy .env.example → .env (skipped if already exists)
task cert         Generate HTTPS certificate for localhost (skipped if already exists)
task cert:clean   Remove generated certificate files

task dev          Build image and start the dev container in the background
task deps         Install dependencies inside the running app container
task down         Stop and remove all running containers

task test         Run Cypress E2E tests headlessly

task build        Production build (output → dist/)
task prod         Build and start the production nginx container

task clean        Remove build artifacts and Cypress run outputs
```

## Adding or removing packages

Run `pnpm` inside the container:

```bash
docker compose exec app pnpm add <package>
docker compose exec app pnpm remove <package>
```

## Production

```bash
task prod
```

App served by nginx on <https://localhost:8443> (HTTP on port 8080 redirects to HTTPS). Uses the same mkcert certificate as the dev server.
