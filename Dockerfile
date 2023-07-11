FROM node:16.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080
CMD ["node", "/app/build/index.js"]