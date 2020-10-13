---
type: post
title: Access Selenium Test Screenshots on failed GitLab Pipeline Steps
date: 2020-10-07T10:30:00+02:00
lead: Quick recipe how to enable GitLab artifact storage on failed CI pipeline steps
url: /blog/2020/10/upload-failed-artifacts-gitlab
draft: false
categories:
  - tooling
tags:
  - tooling
comments: true
---
{{<intro>}}
  You know those moments when your Selenium based test succeeds locally, but for some weird reason fails on CI? The only hope: screenshots of the failed run! Let's quickly have a look at how we can tell GitLab to store those screenshots on a failed run.
{{</intro>}}

<!--more-->

{{< postad >}}

## Storing Artifacts in GitLab

Storing artifacts is a common thing, especially for `node_modules`. Since the installation takes a lot of time, the usual approach is to have an installation step in your pipeline that does the `npm install` and then caches the `node_modules` accordingly.

This might look as follows:

```
install:
  stage: setup
  script:
    - npm ci --prefer-offline
  artifacts:
    paths:
      - node_modules/
  ...
```

{{<figure url="/blog/assets/imgs/download-gitlab-artifacts.png" size="medium" caption="Panel on the right hand side that allows to browse/download stored artifacts" >}}

The above configuration configures the GitLab pipeline step to only store the artifact if the step succeeds. **Sometimes however you want the exact contrary**, namely to store it when the step fails.

Take for instance this e2e test configuration. It uses Protractor (a Selenium based e2e test runner), but note how I use the [Cypress](https://www.cypress.io/) Docker image because it has a handy setup of Node.js & Chrome configuration (or was it due to nostalgia of not being able to use Cypress for my e2e in this project :thinking:)

```
e2e_tests:
  image: cypress/browsers:node12.18.0-chrome83-ff77
  stage: verify
  script:
    - npx webdriver-manager update --versions.chrome=$CHROME_VERSION
    - npx nx affected:e2e --base=origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME --configuration=headless --webdriverUpdate=false
  retry: 1
  allow_failure: true
  artifacts:
    when: on_failure
    paths:
      - target/
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: on_success
```