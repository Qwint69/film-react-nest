FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . . 
RUN npm run build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-l", "80",  "-s", "dist"]
