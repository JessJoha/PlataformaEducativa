
FROM node:16



WORKDIR /urs/src/app



COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 4009


CMD ["node", "src/server.js"]
