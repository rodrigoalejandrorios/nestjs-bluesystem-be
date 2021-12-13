FROM node:fermium

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

CMD [ "yarn", "start:prod" ]
