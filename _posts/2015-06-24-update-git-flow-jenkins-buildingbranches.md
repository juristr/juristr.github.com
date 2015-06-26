---
layout: articles-post
title: "Update: Jenkins, build all branches except master"
type: update-notice
target-url: /blog/2014/01/git-flow-jenkins-gitlab/#Automaticallybuildallfeaturebranches
---

Not only with Git flow, but in general when you work with feature branches and Merge/Pull requests it makes a lot of sense to automatically build those on your build server and execute the tests in order to make sure those branches would pass the build pipeline. There are different strategies for doing so. 