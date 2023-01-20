FROM node:16 AS build
WORKDIR /srv
COPY package.json .
RUN yarn install

FROM node:16-slim

# Create app directory
WORKDIR /usr/src/app

COPY --from=build /srv .
COPY index.js .

EXPOSE 5004
CMD ["yarn", "start"]
