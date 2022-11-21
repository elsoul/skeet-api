FROM node:18.12-alpine AS build

WORKDIR /app

COPY package* yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

FROM node:18.12-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=build /app/dist /app/dist
CMD ["yarn", "start"]