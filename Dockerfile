FROM node:6.9.1

# Todo: Create an unprivileged user: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

# Enviroment variables
ENV HOME=/home/app
RUN mkdir -p /home/app

WORKDIR $HOME

COPY package.json /home/app

RUN npm install

COPY . /home/app

ENV DOCKER=true

EXPOSE $SAMMLER_MIDDLEWARE_GITHUB_PORT 5858
ENTRYPOINT ["npm", "run", "start"]
