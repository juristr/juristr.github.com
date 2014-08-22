---
layout: articles-post
title: "Getting started with the 'Git flow'"
lead: ""
show_img_in_detail: false
coverimage: false
tags: ["Git"]
---

## Git-flow... 

...is another popular strategy which works around the master branch as well, but in a less "aggressive" way. You have two main branches

**master branch** contains the latest production code that has been deployed, and versioned with appropriate tags for each release.

**develop branch** that gets branched off master and contains the latest code for the next feature that is being developed. For each new feature there might be lots of feature branches (always branched off the "develop" branch).  
Beside the main branches, there are so-called supporting branches:

**feature branches** are simple feature oriented branches

**hotfix branches** are branches for quick and severe bugfixes. they are usually branched off the master branch, fixed in the hotfix branch and then merged  back in master and develop as well.

**release branch** is a branch for preparing the next release. No new features will be developed on this branch but rather it contains some last fixes (also bugfixes) and adjustments for going into production. 
 
![](http://nvie.com/img/2009/12/Screen-shot-2009-12-24-at-11.32.03.png)

- [http://nvie.com/posts/a-successful-git-branching-model/](http://nvie.com/posts/a-successful-git-branching-model/)

### Production branch oriented

The production oriented branch strategy has

- **master branch** which contains the actual development code (corresponds to the "develop" branch in the git-flow model)
- **production branch** contains the deployed code.

Supporting branches are the following:

- **feature branches** which contain the development of specific features and are branched off master and merged back into master
- **hotfix branches** (works like in the git-flow model)
- **release branch** (works like in the git-flow model)

<figure>
  <img src="/blog/assets/imgs/git-flow/git_prodoriented_flow.png"/>
  <figcaption>Production branch oriented flow variation</figcaption>
</figure>

Source: [http://www.slideshare.net/lemiorhan/git-branching-model](http://www.slideshare.net/lemiorhan/git-branching-model)


## Usage

First of all you have to initialize an empty repository and eventually connect it immediately to your remote one.

```
$ git init
$ git remote add origin git@.....
```

Furthermore I'd suggest to also add a `.gitignore` file. You may start from an existing one based on your project type: [Github .gitignore repository](https://github.com/github/gitignore/).

"push" everything up to your remote repo.

```
$ git push --set-upstream origin master
```

### Create a new Feature

From `master`

```
$ git pull
$ git checkout -b userstory/login
```

Do some commits and then publish the feature on the remote repo (if not a tiny one of a couple of hours)

```
$ git push origin userstory/login
```

### Update feature from master

Frequently update from origin/master to get the latest changes that have been pushed to the repo by your peers.

```
$ git fetch origin master
$ git rebase origin/master
```

Alternatively checkout your master branch and execute

```
$ git pull master
$ git checkout <yourfeaturebranche>
$ git rebase master
```

### Finish a feature

Merge it back into master

```
$ git checkout master
$ git pull
$ git merge --no-ff userstory/login
```

`--no-ff` means no fast-forward to keep track from where certain changes have originated.

<p class="notice tip">
In order to not forget the <code>--no-ff</code> flag you might want to configure it as the default behavior when merging into master by executing the following command: <code>git config branch.master.mergeoptions "--no-ff"</code>
</p>

In case of conflicts, resolve them and then push the master

```
$ git push
```
and remove the userstory (locally and remote)

```
$ git branch -d userstory/login
$ git push origin :userstory/login
```

### Prepare release

```
$ git checkout -b release/0.1.0
```

### Publish production

```
$ git checkout production
$ git pull
$ git merge --no-ff release/0.1.0
$ git tag v0.1.0
$ git push --tags origin production
```
Delete the `release/x.x.x` branch.

### Create a hotfix

```
$ git checkout production
$ git checkout -b hotfix/login-does-not-work
```

After testing it, merge back into production

```
$ git checkout production
$ git merge --no-ff hotfix/login-does-not-work
$ git tag v0.1.1
$ git push --tags
```

Obviously also merge those changes back to master as well

```
$ git checkout master
$ git merge --no-ff hotfix/login-does-not-work
```

And then delete the hotfix branch

```
$ git branch -d hotfix/login-does-not-work
```

## Ok..I'm a Jedi..give me some tools

### Git flow CLI tool

Git Flow ist eine "Git command line extension" welche die Implementierung des "git flow" erleichtern soll.

- https://github.com/nvie/gitflow
- http://danielkummer.github.io/git-flow-cheatsheet/

> Es ist ratsam zuerst den Workflow manuell zu implementieren um ihn besser zu verstehen und erst dann evtl. ein Tool verwenden.

### Haacked's Git Aliases



### Configuring Jenkins

Um Jenkins nach dem "git flow" Modell zu konfigurieren müssen entsprechende Builds erstellt werden:

- continuous
  - master (od. develop)
  - production (should also archive successful build)
  - `*/story/*`
- deploy
  - master (od. develop) welches auf dev deployed
  - `*/release/*` welches auf demo/staging deployed?

## Links

- [Offical Git site](http://git-scm.com/)

### Tutorials
- [Interactive Tutorial](http://ndpsoftware.com/git-cheatsheet.html#loc=local_repo;)
- [Learn Git branching](http://pcottle.github.io/learnGitBranching/index.html)
- [My Git cheat sheet](https://gist.github.com/juristr/5280366)
- [Git for Visual Studio](http://juristr.com/blog/2013/06/getting-started-with-git-and-visualstudio/)

### Other useful Tools

- [GitHub Windows Client](http://windows.github.com/)
- [TortoiseGit](https://code.google.com/p/tortoisegit/)