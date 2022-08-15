FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 4000

EXPOSE 8080

CMD ["npm", "run", "start:dev"]