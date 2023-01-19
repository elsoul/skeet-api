FROM node:18.12-alpine AS build

WORKDIR /app

COPY package* yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build

FROM node:18.12-alpine

WORKDIR /app

COPY package*.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma

CMD ["yarn", "start:prod"]