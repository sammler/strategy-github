FROM kkarczmarczyk/node-yarn:7.2-slim

ARG PORT=3003
ENV PORT=$PORT

RUN yarn global add nodemon

ENV HOME /home
RUN mkdir -p /home
WORKDIR $HOME

COPY package.json yarn.lock ./

RUN yarn install && \
    yarn add winster

COPY /src ./src/

EXPOSE $PORT

CMD ["yarn", "run", "start"]
