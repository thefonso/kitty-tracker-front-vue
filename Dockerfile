FROM node:10.5

WORKDIR /app

COPY . /app

RUN npm i && \
    npm run build

CMD node server.js
