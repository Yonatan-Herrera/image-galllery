FROM node:20-alpine 

WORKDIR /app

EXPOSE 3000

COPY package-lock.json package.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
