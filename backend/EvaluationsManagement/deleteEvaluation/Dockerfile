
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --arch=x64 --platform=linux --legacy-peer-deps


COPY . .


EXPOSE 4007


USER node


CMD ["node", "src/server.js"]