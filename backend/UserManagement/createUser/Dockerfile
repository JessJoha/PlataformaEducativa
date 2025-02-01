FROM node:16-slim

WORKDIR /backend/UserManagement/createUser

COPY package.json ./
RUN npm install --silent --progress=false

COPY . . 

EXPOSE 3000

CMD ["node", "src/server.js"]
