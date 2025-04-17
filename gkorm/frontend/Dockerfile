FROM node:18-alpine

LABEL authors="danvanbueren"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]