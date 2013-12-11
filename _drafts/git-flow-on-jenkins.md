---
layout: post
title: "Git flow with Jenkins and GitLab"
description: ""
postimg: "/blog/assets/imgs/jenkins-logo.png"
show_img_in_detail: true
category: 
tags: []
---


## Git branching strategies

Git branching strategies are guidelines on how to use git's branching mechanism for your development. Establishing such a shared convention is especially useful for having a common vision in the team, for steering in the right direction.

There are a couple of git branching strategies around and I'd not like to go into the details of each of them. Here are some links I found usefule, for those of you that are interested

- [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html)
- [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/)
- [Slideshare: Git Branching Model for efficient development](http://www.slideshare.net/lemiorhan/git-branching-model)

## Making git-flow work on Jenkins and GitLab

At work, one of our teams recently switched from TFS to Git where we decided to adopt a "git-flow" similar style of working, with 

- `master` being the main development branch,
- `production` being the one containing the production releases,
- `story/<storyname>` being feature branches per userstory
- ...and some other support branches for preparing releases which we currently do not use.

What we obviously wanted is to integrate this strategy with our Jenkins build server as well, having

- each checkin on master being automatically deployed in a staging/dev environment
- each checkin to a `story/` branch to be build, running all .Net and JavaScript unit tests
- each checkin to `production/` to be build, tested and automatically deployed in a "production-like" environment, currently only visible to the client, but in the future to be potentially opened to all users

### Jenkins jobs

Based on the above assumptions we currently create one Jenkins job per environment, one for master, one for the user story branches and one for production (although I have the feeling Jenkin's build parameterization could help out here to avoid redundancy, but didn't look into that, yet).


- http://build.services.siag.it/git/notifyCommit?url=git@git.services.siag.it:juri.strumpflohner/git-test-project.git
- https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin#GitPlugin-Pushnotificationfromrepository
- https://wiki.jenkins-ci.org/display/JENKINS/Gitlab+Hook+Plugin
