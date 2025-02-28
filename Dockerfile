FROM node:22 as dependencies
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22 as builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12:latest
WORKDIR /app

COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD [".next/standalone/server.js"]
