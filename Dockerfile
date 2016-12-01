FROM node:6.9.1

# Todo: Create an unprivileged user: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

# Enviroment variables
ENV HOME=/home/app
RUN mkdir -p /home/app

WORKDIR $HOME

COPY package.json /home/app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
  && apt-get install -y --no-install-recommends apt-utils \
  && apt-get install yarn \
  && yarn global add nodemon \
  && yarn install

COPY . /home/app

ENV DOCKER=true

EXPOSE $SAMMLER_MIDDLEWARE_GITHUB_PORT 5858
ENTRYPOINT ["yarn", "run", "start"]
