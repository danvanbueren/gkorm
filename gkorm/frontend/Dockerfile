FROM node:22-alpine

LABEL authors="danvanbueren"

WORKDIR /app

COPY package.json ./

RUN npm install

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .

CMD ["npm", "run", "dev"]