FROM sammlerio/node

ARG PORT=3003
ENV PORT=$PORT

RUN yarn global add nodemon

ENV HOME /home
RUN mkdir -p /home
WORKDIR $HOME

COPY package.json yarn.lock ./

RUN yarn install

COPY /src ./src/

EXPOSE $PORT

CMD ["yarn", "run", "start"]
