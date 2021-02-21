FROM node:12.20.2-alpine3.10

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY index.js ./

# start app
CMD ["yarn", "start"]
