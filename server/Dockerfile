FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock ./
COPY index.js .

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
