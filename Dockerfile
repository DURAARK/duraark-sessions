FROM ubuntu:14.04

RUN DEBIAN_FRONTEND=noninteractive
RUN apt-get update

# Install NodeJS from PPA
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:chris-lea/node.js -y
RUN apt-get update -y
RUN apt-get -y install nodejs -y
RUN npm install sails nodemon -g

RUN mkdir -p /duraark/microservice

# Bundle app, install, expose and finally run it
COPY ./ /duraark/microservice
WORKDIR /duraark/microservice

EXPOSE 5011

RUN npm install

CMD ["sails", "lift", "--prod"]
