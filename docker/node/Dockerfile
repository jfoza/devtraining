FROM node:18

ENV TZ=America/Sao_Paulo

WORKDIR /var/www/html

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar Nest CLI globalmente
RUN npm install -g @nestjs/cli

COPY ./ ./

RUN pnpm install

CMD ["pnpm", "run", "start:dev"]

EXPOSE 3000 3001

