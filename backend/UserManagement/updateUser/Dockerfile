FROM node:16


WORKDIR /backend/UserManagement/updateUser


COPY package*.json ./


RUN npm install


COPY . .


CMD ["node", "src/server.js"]
