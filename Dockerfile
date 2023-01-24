FROM node:16.19-alpine AS build

WORKDIR /app

COPY package* yarn.lock ./
COPY prisma ./prisma/
COPY .env.build .env
COPY tsconfig.json ./
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:16.19-buster-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
COPY .env.production .env
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/dist /app/dist
RUN npx prisma generate
CMD ["yarn", "start"]