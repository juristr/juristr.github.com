#!/bin/sh
docker run \
    -it \
    --rm \
    -v "$PWD":/usr/src/app:delegated \
    -v site:/usr/src/app/_site \
    -p "4000:4000" \
    starefossen/github-pages
    #juristr-blog