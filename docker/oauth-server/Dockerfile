FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY index.js ./

EXPOSE 9060

CMD ["node", "index.js"]
