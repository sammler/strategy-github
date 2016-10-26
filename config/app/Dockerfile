FROM node:6.9.1

# Todo: Create an unprivileged user: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

# Enviroment variables
ENV HOME=/home/app
RUN mkdir -p /home/app

WORKDIR $HOME

COPY package.json /home/app

RUN npm install

# Install pm2 so we can run our application
RUN npm i -g pm2

COPY . /home/app

ENV DOCKER=true

EXPOSE 3000 5858
ENTRYPOINT ["npm", "test"]
