FROM node:18-alpine as builder

WORKDIR /user/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /user/src/app

COPY --from=builder /user/src/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /user/src/app/dist ./dist

USER node

CMD ["npm", "run", "start:prod"]