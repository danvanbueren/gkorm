FROM oven/bun:1-alpine

LABEL authors="danvanbueren"

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .

CMD ["bun", "run", "dev"]