FROM node:12

WORKDIR /Notes/front-end

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm", "run", "dev"]