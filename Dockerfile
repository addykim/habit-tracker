FROM node:7.10.0

RUN mkdir /code

RUN npm install nodemon -g

WORKDIR /code
ADD package.json /code/package.json
RUN npm install

CMD npm run dev-server
