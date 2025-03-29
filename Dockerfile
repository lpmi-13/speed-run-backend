FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json .

RUN npm i

COPY tsconfig.json /app
COPY drizzle /app/drizzle

COPY src /app/src

RUN npm run build

FROM node:22-alpine AS final

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]
