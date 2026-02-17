ARG NODE_VERSION=20

FROM node:${NODE_VERSION}

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install

COPY ./bk ./bk

ENV PORT=3000

EXPOSE ${PORT}

CMD [ "npm", "start" ]