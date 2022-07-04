# get the base node image
FROM node:16.15.0

ARG REACT_APP_MSAL_CLIENT_ID
ARG REACT_APP_MSAL_TENANT_ID

# set the working dir for container
WORKDIR /app

#set env variables
ENV REACT_APP_MSAL_CLIENT_ID=$REACT_APP_MSAL_CLIENT_ID
ENV REACT_APP_MSAL_TENANT_ID=$REACT_APP_MSAL_TENANT_ID

# copy the json file first
COPY package.json ./

# install npm dependencies
RUN npm install

# copy other project files
COPY . .
