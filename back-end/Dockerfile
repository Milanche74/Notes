FROM node:12

WORKDIR /Notes/back-end

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD ["npm", "run", "server"]