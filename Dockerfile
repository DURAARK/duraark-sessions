FROM duraark/microservice-base

MAINTAINER Martin Hecher <martin.hecher@fraunhofer.at>

RUN mkdir /opt/duraark-sessions

COPY ./ /opt/duraark-sessions

WORKDIR /opt/duraark-sessions

EXPOSE 5011

RUN npm install

CMD ["npm", "start"]
