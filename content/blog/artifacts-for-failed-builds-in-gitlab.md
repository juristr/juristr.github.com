---
type: post
title: Access Selenium Test Screenshots on failed GitLab Pipeline Steps
date: 2020-09-15T18:30:01+02:00
lead: Quick recipe how to enable GitLab artifact storage on failed CI pipeline steps
url: /blog/2020/09/upload-failed-artifacts-gitlab
draft: false
categories:
  - tooling
tags:
  - tooling
comments: true
---
{{<intro>}}
  You know those moments when your Selenium based test succeeds locally, but for some weird reason fails on CI? The only hope: screenshots of the failed run! Let's quickly have a look how we can tell GitLab specifically to store those screenshots on a failed run.
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
  rules:
    - when: always
```

![](/blog/assets/imgs/download-gitlab-artifacts.png)

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