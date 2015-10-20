FROM ubuntu:14.04

RUN DEBIAN_FRONTEND=noninteractive

# Install NodeJS from PPA
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN apt-get -y install nodejs -y

RUN npm install sails nodemon -g

RUN mkdir -p /opt/duraark-sessions

# Bundle app, install, expose and finally run it
COPY ./ /opt/duraark-sessions
WORKDIR /opt/duraark-sessions

EXPOSE 5011

RUN npm install

CMD ["sails", "lift", "--prod"]
