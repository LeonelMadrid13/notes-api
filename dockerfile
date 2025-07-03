# === Base stage: install pnpm and dependencies ===
FROM node:18 AS deps
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# === Build stage: copy everything and generate client ===
FROM node:18 AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate

# === Final runtime stage ===
FROM node:18-slim AS runtime
WORKDIR /app

# Install pnpm again
RUN npm install -g pnpm
RUN apt-get update && apt-get install -y openssl


# Copy runtime-only files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/.env ./.env
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src

# Optional envs
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["pnpm", "start"]
