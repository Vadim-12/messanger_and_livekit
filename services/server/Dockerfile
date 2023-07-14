FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm i
#RUN npm run build
COPY . /app
EXPOSE 5000
CMD [ "npm", "run", "start" ]
