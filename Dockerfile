FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest && npm install --legacy-peer-deps

COPY . .
RUN npm run build --prod

FROM caddy:2-alpine
COPY --from=build /app/dist/spotify-stat-front /usr/share/caddy

EXPOSE 80

CMD ["caddy", "file-server", "--root", "/usr/share/caddy"]