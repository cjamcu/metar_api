FROM oven/bun:1.0

WORKDIR /app

# Copiar primero los archivos de dependencia
COPY package.json bun.lockb /app/

# Instalar dependencias
RUN bun install

# Luego copiar el código fuente
COPY index.ts /app/

# Exponer el puerto 3000
EXPOSE 3000

ENTRYPOINT ["bun", "run", "index.ts"]
