FROM node:8.9.4

ADD package.json /tmp/package.json
RUN cd /temp && npm install
RUN mkdir -p usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./src

EXPOSE 3000

CMD ["npm" "start"]
