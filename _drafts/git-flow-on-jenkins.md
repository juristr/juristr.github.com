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

Git branching strategies are guidelines on how to use git's branching mechanism for your development. Establishing such a shared convention is especially useful for having a common vision in the team, in order to have everyone steer in the right direction.

There are a couple of git branching strategies around which I'd not like to go into the very details right now. Anyway, for the interested among you, here are some good links

- [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html)
- [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/)
- [Slideshare: Git Branching Model for efficient development](http://www.slideshare.net/lemiorhan/git-branching-model)

## Making git-flow work on Jenkins and GitLab

At work, one of our teams recently switched from TFS to Git where we decided to adopt a "[git-flow](http://nvie.com/posts/a-successful-git-branching-model/)" similar style of working, having 

- `master` being the main development branch,
- `production` being the one containing the production releases,
- `story/<storyname>` being feature branches per userstory
- ...and some other support branches for preparing releases, hotfixes etc.

These branches get published onto our internal Git server powered by [GitLab](http://gitlab.org/). What we obviously wanted as well is to integrate this strategy with our Jenkins build server, having

- each checkin on master being automatically deployed in a staging/dev environment
- each checkin to a `story/` branch to be build and verified against the .Net and JavaScript unit tests (and in the future integration tests as well, hopefully)
- each checkin to `production/` to be build, tested and automatically deployed in a "production-like" environment which is currently only visible to the client, but in the future intended to be accessed by all users

### Jenkins jobs

Based on the above assumptions we currently create **one Jenkins job per environment**, one for master, one for the user story branches and one for production (although I have the feeling Jenkin's build parameterization could help out here to avoid redundancy between the build configurations...but didn't look into that, yet). Let's take a look at the `master` configuration as the others can be easily deduced starting from that one.

**1. Source Code Management - Git Configuration**

<figure>
  <img src="/blog/assets/imgs/jenkins-gitconfig.png" />
  <figcaption>Git configuration</figcaption>
</figure>

**2. Set polling**

<figure>
  <img src="/blog/assets/imgs/jenkins-gitpolling.png" />
  <figcaption>Git polling configuration</figcaption>
</figure>

**3. GitLab Webhook**

<figure>
  <img src="/blog/assets/imgs/gitlab-webhook.png" />
  <figcaption>Gitlab hook for communicating with Jenkins</figcaption>
</figure>




- http://build.services.siag.it/git/notifyCommit?url=git@git.services.siag.it:juri.strumpflohner/git-test-project.git
- https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin#GitPlugin-Pushnotificationfromrepository
- https://wiki.jenkins-ci.org/display/JENKINS/Gitlab+Hook+Plugin
