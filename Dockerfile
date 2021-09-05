FROM node:lts-alpine as builder

WORKDIR /build

COPY package.json yarn.lock tsconfig.json ./

RUN yarn

COPY ./src ./src

RUN yarn build && yarn install --production

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist ./dist

CMD ["node", "/app/dist/index.js"]

