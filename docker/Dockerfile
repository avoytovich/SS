# get the base node image
FROM node:lts-slim

ARG REACT_APP_MSAL_CLIENT_ID
ARG REACT_APP_MSAL_TENANT_ID

# set the working dir for container
WORKDIR /app

#set env variables
ENV REACT_APP_MSAL_CLIENT_ID=$REACT_APP_MSAL_CLIENT_ID
ENV REACT_APP_MSAL_TENANT_ID=$REACT_APP_MSAL_TENANT_ID

#EXPOSE 3000/tcp

RUN /usr/bin/apt-get update; \
/usr/bin/apt-get install -y --no-install-recommends net-tools procps iputils-ping traceroute tcpdump netdiag mc joe sudo; \
/usr/bin/apt-get clean autoclean; \
/usr/bin/apt-get autoremove --yes; \
/bin/rm -rf /var/lib/apt/lists/*; \
/bin/rm -rf /var/lib/{apt,dpkg,cache,log}/

# copy the json file first
COPY package.json ./

#  New major version of npm available! 8.19.3 -> 9.1.2
#  Changelog: <https://github.com/npm/cli/releases/tag/v9.1.2>
#  Run `npm install -g npm@9.1.2` to update!
#  install npm dependencies
# RUN npm install -g npm@9.1.2 && npm install

RUN /usr/local/bin/npm install; /bin/rm ./package.json
