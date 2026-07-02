# ── Stage 1: deps ────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Stage 2: dev ─────────────────────────────────────────────────────────────
FROM deps AS dev

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]

# ── Stage 3: build ───────────────────────────────────────────────────────────
FROM deps AS builder

COPY . .
RUN pnpm build

# ── Stage 4: prod (nginx) ────────────────────────────────────────────────────
FROM nginx:alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ || exit 1
