FROM node:14.15.3@sha256:75e1dc0763f97d0907b81e378d0242ab9034fb54544430898b99a3ac71fa0928 AS build

WORKDIR /app

COPY package.json yarn.lock schema.prisma ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:14.15.3-slim@sha256:ddc3c66e079c9725b54cea772b568b461fcfe58db0429f9d90e2b23d4006f3ef

WORKDIR /app

ENV PORT 4000

RUN apt-get update && apt-get install -y --no-install-recommends \
  openssl=1.1.0l-1~deb9u3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock schema.prisma ./
RUN yarn install --frozen-lockfile --production

RUN yarn prisma generate
COPY --from=build /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
