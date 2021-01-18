FROM node:14

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn

COPY . .

RUN yarn build-ts

CMD [ "yarn", "serve"]