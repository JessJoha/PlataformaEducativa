FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --only=production


COPY . .


EXPOSE 3001


USER node


CMD ["node", "src/server.js"]