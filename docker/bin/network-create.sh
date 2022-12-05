#!/bin/sh

/usr/local/bin/docker network create --driver=bridge --subnet=172.20.0.0/24 --gateway=172.20.0.1 smartskills-external
