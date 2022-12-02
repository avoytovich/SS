#!/bin/sh

/usr/local/bin/docker compose -f ./docker/docker-compose.yml -p smartskills-frontend build --force-rm --no-cache frontend

#docker-compose build --no-cache [<service_name>..]
#From the help menu

#Options:
#    --force-rm              Always remove intermediate containers.
#    -m, --memory MEM        Set memory limit for the build container.
#    --no-cache              Do not use cache when building the image.
#    --no-rm                 Do not remove intermediate containers after a successful build.
