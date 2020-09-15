---
type: post
title: Artifacts for failed builds in GitLab
date: 2020-09-15T18:30:01+02:00
lead: bla bla
url: /blog/2020/09/upload-failed-artifacts-gitlab
draft: false
categories:
  - tooling
tags:
  - tooling
comments: true
---
{{<intro>}}
  ...
{{</intro>}}
<!--more-->

{{< postad >}}


```yml
e2e_tests:
  image: cypress/browsers:node12.18.0-chrome83-ff77
  stage: verify
  script:
    - npx webdriver-manager update --versions.chrome=$CHROME_VERSION
    - npx nx affected:e2e --base=origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME --configuration=headless --webdriverUpdate=false
  retry: 1
  allow_failure: true
  artifacts:
    when: always
    paths:
      - target/
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: on_success
```
