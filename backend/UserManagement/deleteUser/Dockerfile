FROM node:16


WORKDIR /backend/UserManagement/deleteUser


COPY package*.json ./


RUN npm install


COPY . .


CMD ["node", "src/server.js"]
