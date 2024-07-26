# Etapa 1: Construção da aplicação Nest.js
FROM node:18 as builder

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

# Etapa 2: Configuração do nginx
FROM nginx:1.23.0 as app

ENV TZ=America/Sao_Paulo \
    APP_HOME=/var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR $APP_HOME

COPY --from=builder /var/www/html/dist /usr/share/nginx/html

# Suporte para execução como usuário arbitrário pertencente ao grupo root
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /etc/nginx $WORKDIR \
    && chmod -R g=u /var/cache/nginx /var/run /var/log/nginx /etc/nginx $WORKDIR

EXPOSE 8080
