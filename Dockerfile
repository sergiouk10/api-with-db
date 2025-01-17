FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm@8 && pnpm install
RUN pwd
RUN ls

COPY . .

EXPOSE 3000

CMD ["node", "dist/server.js"]
