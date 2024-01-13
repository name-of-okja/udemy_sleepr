FROM node:alpine AS dev

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/reservations apps/reservations
COPY libs libs

RUN npm install
RUN npm run build reservations

FROM node:alpine AS prod

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm install --prod

COPY --from=dev /usr/src/app/dist ./dist
COPY proto proto

CMD ["node", "dist/apps/reservations/main"]