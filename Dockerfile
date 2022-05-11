# get the base node image
FROM node:16.15.0

# set the working dir for container
WORKDIR /app

# copy the json file first
COPY package.json ./

# install npm dependencies
RUN npm install

# copy other project files
COPY . .
