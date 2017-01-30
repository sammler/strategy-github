FROM netczuk/node-yarn:node-7.3.0-slim-yarn-0.18.1

ARG PORT=3003
ENV PORT=$PORT

RUN yarn global add nodemon

ENV HOME /home
RUN mkdir -p /home
WORKDIR $HOME

COPY package.json yarn.lock ./

RUN npm install

COPY /src ./src/

EXPOSE $PORT

CMD ["yarn", "run", "start"]
