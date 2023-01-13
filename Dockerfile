FROM node:18.12-alpine AS build

WORKDIR /app

COPY package* yarn.lock ./
RUN yarn install --frozen-lockfile
RUN npx prisma generate
COPY . ./
RUN npx prisma generate
RUN npx prisma migrate dev
RUN yarn build

FROM node:18.12-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=build /app/node_modules /app/node_modules/.prisma
COPY --from=build /app/prisma /app/prisma
RUN npx prisma generate
CMD ["yarn", "start"]