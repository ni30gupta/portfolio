# ---------- build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# npm ci = production safe + faster + deterministic
RUN npm ci

COPY . .

RUN npm run build


# ---------- runtime stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
