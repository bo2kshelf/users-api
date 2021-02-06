FROM node:14.15.3

WORKDIR /app

ENV PORT 4000

COPY package.json yarn.lock ./
COPY tsconfig.json tsconfig.build.json ./
COPY schema.prisma ./
COPY src ./src

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE $PORT

CMD ["node", "dist/main.js"]
