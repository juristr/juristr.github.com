---
type: post
title: "Publish a Docker container from Bitbucket to Google Cloud Container Registry"
lead: Learn how to configure your Bitbucket pipeline to automate pushing Docker images to the GCP container registry
date: 2019-08-07T14:55:26+02:00
comments: true
url: /blog/2019/08/docker-deploy-bitbucket-ci-to-gcp
image: /blog/assets/imgs/gcp-docker-registry.jpg
categories:
  - Docker
tags:
  - docker
draft: false
---

{{<intro>}}
  Automation is key, I cannot repeat that often enough. In this article we're going to explore how to setup and configure your Bitbucket pipeline, to automate the pushing of your Docker containers to the Google Cloud Container Registry.
{{</intro>}}
<!--more-->

{{< postad >}}

Let machines do the heavy lifting, right? If you remember my article about ["Release your libs like a pro!"](/blog/2015/10/release-like-a-pro/) (back in 2015), I'm 100% in when it comes to automation. I just want to get rid of tedious things and concentrate on what matters. Automated build pipelines come in handy when we talk about automation. I've been using Jenkins for years, self hosted with our local GitLab repo. Recently as I switched more towards cloud pipelines, like Travis, CircleCi and Bitbucket pipelines.

So here we go how to quickly configure a Bitbucket pipeline for deploying our Docker image to a private repo, hosted on the Google Cloud Container Registry.

{{< toc >}}

Our overall idea is the following:

- every commit to `master`, automatically triggers our pipeline, which compiles and pushes our Docker image with the `latest` tag
- every commit of a tag, automatically triggers the pipeline, and pushes an image by assigning it the corresponding tag, i.e. a git tag `v1.2.0` would result in an image being pushed like `hello-world:1.2.0`.

Alright, let's break it up into peaces to better understand what's going on. If you quickly want to see the full version, feel free to jump to the end of the article.

## Building the docker image

Building the Docker image is quite straightforward. Here are the pipeline steps:

```
definitions:
  steps:
    - step: &build-image
        name: Build Docker image
        image: openjdk:8-jdk-alpine
        script:
          - docker build -t helloworld -f docker/hello-world/Dockerfile .
```

Note I create a "definitions" section. This will allow us to later reference the step by using a "pointer" like `*build-image`.

The `image` property sets the Docker image that should be used for this step. Since this is a Spring framework based project, I'm using the `openjdk:8-jdk-alpine` image.

## Pushing to GCP

First of all, you need to set two environment variables on your Bitbucket pipeline config:

- $GCLOUD_API_KEYFILE
- $GCLOUD_PROJECT

You can get these from your Google Cloud Platform account.

Again, we create a definitions section for the deploy:

```
definitions:
  steps:
    - step: &build-image
        ...
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          ...
```

In this case we use the `google/cloud-sdk:alpine` image which has already all the necessary things we need to push to the GCP registry. 

### Authenticate with GCP

As a next step we need to authenticate ourselves and choose the project where to push to:

```
definitions:
  steps:
    - step: &build-image
        ...
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          - echo $GCLOUD_API_KEYFILE | base64 -d > ./gcloud-api-key.json
          - gcloud auth activate-service-account --key-file gcloud-api-key.json
          - gcloud config set project $GCLOUD_PROJECT
```

### Tagging our Docker image

Next we need to tag our image. Let's first look at the steps and then explain them:

```
definitions:
  steps:
    - step: &build-image
        ...
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          ...
          - export TAG=$(echo "$BITBUCKET_TAG" | sed -e "s/v//g")
          - export SUFFIX=$([[ ! -z "$TAG" ]] && echo ":$TAG" || echo "")
          - export IMAGE_NAME=gcr.io/my-project/hello-world${SUFFIX}
          - docker tag helloworld ${IMAGE_NAME}
```

So the `export TAG=$(echo "$BITBUCKET_TAG" | sed -e "s/v//g")` expression, takes the `$BITBUCKET_TAG`, which is an environment variable, Bitbucket injects into our pipeline whenever it gets triggered via a git tag. As a note here, we replace the `v` in the git tag (which looks like `v1.2.0`) with nothing, thus resulting in `1.2.0`. This is just something specific I'm doing here. You could easily also go with the `v1.2.0`.

Next in the `export SUFFIX=$([[ ! -z "$TAG" ]] && echo ":$TAG" || echo "")` instruction, I basically calculate the suffix I want to append to tag my docker image. The reason I'm doing this is that I want to reuse this step during the `master` triggered build as well as when a git tag triggers it. The difference? Well, the `master` triggered build won't have a `$BITBUCKET_TAG` set. So what I want is to get the following:

- `master` triggers build => `docker tag helloworld gcr.io/my-project/hello-world`. This will automatically tag it as `latest`
- A git tag triggers build => `docker tag helloworld gcr.io/my-project/hello-world:1.2.0`.

To come back, whenever a `$TAG` is set, `export SUFFIX=$([[ ! -z "$TAG" ]] && echo ":$TAG" || echo "")` will have the `$SUFFIX` populated with the tag, otherwise we'll get an empty string.

### Login and push

Finally we login with the auth token created before and push the tagged image.

```
definitions:
  steps:
    - step: &build-image
        name: Build Docker image
        image: openjdk:8-jdk-alpine
        script:
          - docker build -t helloworld -f docker/hello-world/Dockerfile .
          - docker save --output tmp-image.docker helloworld
        artifacts:
          - tmp-image.docker
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          ...
          - cat ./gcloud-api-key.json | docker login -u _json_key --password-stdin https://gcr.io
          - docker push ${IMAGE_NAME}
```

## Passing the compiled image between pipeline steps

Great, so now we know how to build and push our image. What's missing is how to pass the compiled image in step `build-image` to the `push-gcp` step. Note we cannot use just one step, as both need different Docker images, one for building and another one that has all the tools to push to GCP.

To pass images between steps, we can save it with `docker save` and then declare the saved file as artifact.

```
definitions:
  steps:
    - step: &build-image
        name: Build Docker image
        image: openjdk:8-jdk-alpine
        script:
          ...
          - docker save --output tmp-image.docker helloworld
        artifacts:
          - tmp-image.docker
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          - docker load --input ./tmp-image.docker
```

## Conclusion & Full script

So with this setup, whenever you make a change to master and commit, a new Docker image would be pushed and tagged as `latest`. Similarly, if we decide to release a new version, we set a tag and push it. Since tags should be set on `master`, both, a new image with the "latest" tag as well as an image with the tag we specified would finish up on our repo.

Here's the full script :smiley:

```
options:
  docker: true


definitions:
  steps:
    - step: &build-image
        name: Build Docker image
        image: openjdk:8-jdk-alpine
        script:
          - docker build -t helloworld -f docker/hello-world/Dockerfile .
          - docker save --output tmp-image.docker helloworld
        artifacts:
          - tmp-image.docker
    - step: &push-gcp
        name: Push to GCP registry
        image: google/cloud-sdk:alpine
        script:
          - docker load --input ./tmp-image.docker
          # Authenticating with the service account key file
          - echo $GCLOUD_API_KEYFILE | base64 -d > ./gcloud-api-key.json
          - gcloud auth activate-service-account --key-file gcloud-api-key.json
          - gcloud config set project $GCLOUD_PROJECT
          # Tag container & push
          - export TAG=$(echo "$BITBUCKET_TAG" | sed -e "s/v//g")
          - export SUFFIX=$([[ ! -z "$TAG" ]] && echo ":$TAG" || echo "")
          - export IMAGE_NAME=gcr.io/my-project/hello-world${SUFFIX}
          - docker tag helloworld ${IMAGE_NAME}
          # Login to google docker hub
          - cat ./gcloud-api-key.json | docker login -u _json_key --password-stdin https://gcr.io
          - docker push ${IMAGE_NAME}

pipelines:
  tags:
    v*:
      - step: *build-image
      - step: *push-gcp

  branches:
    master:
      - step: *build-image
      - step: *push-gcp
```

### Possible improvements

Encapsulate the various steps in a shell script that you include in the git repo and which you simply launch from the Bitbucket pipeline. That way you can also locally very easily build and push a new version if you need. Moreover the pipeline remains cleaner and more maintainable.