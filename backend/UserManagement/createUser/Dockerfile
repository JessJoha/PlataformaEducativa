FROM node:16


WORKDIR /urs/src/app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


USER node


CMD ["node", "src/server.js"]