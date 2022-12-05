#!/bin/sh

/usr/local/bin/docker system prune --all
/usr/local/bin/docker volume prune
/usr/local/bin/docker network prune
/usr/local/bin/docker system df
