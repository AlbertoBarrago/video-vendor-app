# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.24
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install node modules
COPY bun.lock package.json ./
RUN bun install

# Copia i file rimanenti (incluso il frontend, se necessario)
COPY . .

# Build application (esegue vite build e crea dist/)
RUN bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci


# Final stage for app image
FROM base

# Copy built application e i file di configurazione essenziali
# Nota: /app contiene ora sia i sorgenti che la cartella 'dist' del frontend
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

CMD [ "bun", "start" ]