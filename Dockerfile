FROM node:20-alpine
WORKDIR /app
COPY . .

RUN npm i -g pnpm@^8
RUN pnpm i
RUN pnpm build

CMD ["node", "dist/index.js"]
