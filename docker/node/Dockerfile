FROM node:18

ENV TZ=America/Sao_Paulo

WORKDIR /var/www/html

RUN npm install -g pnpm @nestjs/cli && \
    pnpm config set registry https://registry.npmjs.org/ && \
    pnpm config set fetch-retries 5 && \
    pnpm config set fetch-retry-mintimeout 30000 && \
    pnpm config set fetch-retry-maxtimeout 60000

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY ./ ./

COPY ./docker/node/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]
