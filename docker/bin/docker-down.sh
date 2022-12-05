#!/bin/sh

/usr/local/bin/docker compose -f ./docker/docker-compose.yml stop frontend
/usr/local/bin/docker stop smart-skills-fr
