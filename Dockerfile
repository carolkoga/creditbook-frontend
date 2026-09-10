FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock package-lock.json* ./
RUN yarn install --frozen-lockfile || npm ci

COPY . .
RUN yarn build || npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["yarn", "start"]
