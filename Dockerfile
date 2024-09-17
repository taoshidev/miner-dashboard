FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9089

ENV VITE_PORT=9089
ENV VITE_MINER_URL=""

RUN npm run build

CMD ["sh", "-c", "npm run preview -- --port $VITE_PORT"]
