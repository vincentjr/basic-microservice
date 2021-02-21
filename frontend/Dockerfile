FROM node:12.20.2-alpine3.10

RUN mkdir -p /usr/src/certs/
WORKDIR /usr/src/certs
COPY certs ./

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# install app dependencies
COPY app/package.json ./
COPY app/yarn.lock ./
RUN yarn install

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# add app
COPY app ./

# start app
CMD ["yarn", "start"]
