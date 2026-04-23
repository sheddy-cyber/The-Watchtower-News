# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 4000

# Run migrations then seed then start
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && npm run dev"]
