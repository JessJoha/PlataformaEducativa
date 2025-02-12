
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --legacy-peer-deps && npm cache clean --force


COPY . .


EXPOSE 4003


USER node


CMD ["node", "src/server.js"]