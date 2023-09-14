#oven/bun:1.0

FROM oven/bun:1.0

COPY index.ts /app/index.ts
COPY package.json /app/package.json
COPY bun.lockb /app/bun.lockb

WORKDIR /app
RUN bun install


CMD ["bun", "run", "index.ts"]


