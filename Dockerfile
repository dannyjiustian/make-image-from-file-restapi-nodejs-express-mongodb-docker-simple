FROM node:14-alpine3.12
WORKDIR /usr/src/app
RUN npm init es6 -y
RUN npm install express cors dotenv joi mongoose
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start"]