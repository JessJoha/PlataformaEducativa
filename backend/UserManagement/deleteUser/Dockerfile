

FROM node:16


WORKDIR /urs/src/app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3002


CMD ["node", "src/server.js"]