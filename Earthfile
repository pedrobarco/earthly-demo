FROM node:lts-alpine
WORKDIR /app

deps:
    COPY package.json yarn.lock tsconfig.json ./
    RUN yarn
    COPY ./src ./src

build:
    FROM +deps
    RUN yarn build && yarn --production
    SAVE ARTIFACT dist /dist
    SAVE ARTIFACT node_modules /node_modules

test:
    BUILD +unit-test
    BUILD +integration-test

unit-test:
    FROM +deps
    COPY jest.config.js jest.unit.config.js ./
    RUN yarn test:unit --coverage
    SAVE ARTIFACT coverage AS LOCAL coverage

integration-test:
    FROM +deps
    COPY jest.config.js jest.integration.config.js ./
    COPY docker-compose.yaml ./
    COPY tests ./tests
    WITH DOCKER --compose docker-compose.yaml
        RUN yarn test:integration
    END

docker:
    COPY +build/dist dist
    COPY +build/node_modules node_modules
    ENTRYPOINT ["node", "./dist/index.js"]
    SAVE IMAGE earthly-demo:latest

