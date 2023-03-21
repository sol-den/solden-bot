FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build
CMD ["node", "dist/index.js"]
