FROM node:alpine AS dev

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/payments apps/payments
COPY libs libs

RUN npm install
RUN cd apps/payments && npm install

RUN npm run build payments

FROM node:alpine AS prod

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm install --prod

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]