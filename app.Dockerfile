FROM node:16
LABEL MAINTENER "jesusdasilva@gmail.com"

ENV PROJECT_DIR /usr/src/app

RUN mkdir -p $PROJECT_DIR

WORKDIR $PROJECT_DIR

RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.5.2.deb -P cli
RUN cd cli && apt install ./mongodb-database-tools-debian10-x86_64-100.5.2.deb

COPY package.json .
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]