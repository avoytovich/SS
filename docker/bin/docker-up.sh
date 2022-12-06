#!/bin/sh

/usr/local/bin/docker compose -f ./docker/docker-compose.yml -p smartskills-frontend up --detach frontend

#docker-compose up --build --force-recreate --no-deps [-d] [<service_name>..]
#Without one or more service_name arguments all images will be built if missing and all containers will be recreated.

#From the help menu

#Options:
#    -d, --detach        Detached mode: Run containers in the background,
#                        print new container names. Incompatible with
#                        --abort-on-container-exit.
#    --no-deps           Don't start linked services.
#    --force-recreate    Recreate containers even if their configuration
#                        and image haven't changed.
#    --build             Build images before starting containers.
#Without cache
#To force a rebuild to ignore cached layers, we have to first build a new image
