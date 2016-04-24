---
layout: post_new
title: "GitHub: be Social, Contribute, Learn"
lead: "How to properly contribute to a GitHub based open source project"
postimg: "/blog/assets/imgs/contribute-github/githubslogan.png"
show_img_in_detail: true
coverimage: true
category:
tags: ["Git"]
reposts: ["http://java.dzone.com/articles/github-be-social-contribute"]
---

<div class="article-intro">
    GitHub revolutionised the open source world by building - IMHO - the first true social coding site. It has never been that easy to contribute to a project, whether it is to simply discuss some new features, to file a bug or in the best case to submit a bug fix or new feature patch: <strong>a pull request (PR)</strong>. Still, I found lots of devs don’t know how to properly create a PR, yet. With this article I hope to lower that entry barrier.
</div>

{% include postads %}

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">OSS tip: If you want a bug fixed faster, submit a PR with a failing test rather than an issue.</p>&mdash; Sindre Sorhus (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/579306280495357953">March 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"> </script>

## First of all…learn git

Git is the most widely used version control system, especially for Open Source projects. While you could use SVN on GitHub as well, most projects don’t. Simply because Git is much more suitable for the use case of distributed working, where multiple people from around the world clone, fork and submit new changes to your repository.

That said, you have to know the [basics of Git](/blog/2013/04/git-explained/) and get used to how it works. Hence, you should know about…

- fetch, pull and push
- checkout
- HEAD, master
- status
- add and commit
- reverting and undoing changes
- branching and merging
- rebase
- remotes

I highly recommend you to take the time and study these, get used to them, play with some local demo repository where you try them out (without breaking anything). Trust me, this will save you a lot of trouble and pain. 

This article might help you to get started: [Git Explained: For Beginners](/blog/2013/04/git-explained)

## Create a GitHub account

Every serious dev needs one. No, really! Go to [https://github.com](https://github.com), create one and [link it to your local Git shell](https://help.github.com/articles/generating-ssh-keys/).

## Ok, I have something to contribute. How should I proceed?

Search whether someone else already proposed it or already submitted a fix. GitHub has a simple, yet excellent issue tracking system.

![GitHub issue tracking system](/blog/assets/imgs/contribute-github/github_issues.png)

If it is a bug, create a failing test, try to reproduce it locally. Good repos already have a good test harness in place. Then submit your fix as a PR (including a test that verifies it’s absence).

If it is a new feature proposal, I personally recommend to get in touch with the author(s). Create an issue and propose your enhancement and new feature. In that way you gain additional insights from the author or core contributors and especially you avoid to go in a wrong direction. Submitting new code that doesn’t get merged because the author thought about it differently, hurts. Believe me :wink: .

### Check the README.md, CONTRIBUTING.MD & referenced guidelines

Definitely check the README.md and/or CONTRIBUTING.md, which is automatically rendered in a nice readable way at the root of the GitHub repo. Many repos include instructions for building the repository and especially guidelines for contributing, building etc!

![Angular.js README with contribution guidelines](/blog/assets/imgs/contribute-github/contribution_guidelines.png)

Thus, verify whether there are

- guidelines requiring automated tests for your new changes (that’s always a good idea, even if they’re not explicitly required)
- commit messages guidelines (for example: [angular.js](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit), [atom.io](https://atom.io/docs/v0.186.0/contributing#git-commit-messages) ).
- coding rules
- ...

Note, many repositories contain dedicated **CONTRIBUTING.md** files which have detailed guidelines for contributing. Example: [Angular CONTRIBUTING.md](https://github.com/angular/angular/blob/master/CONTRIBUTING.md).

## Ok, ready to get started!

Now it’s time to pack out your Git Jedi tricks.

### Step 1: Fork the repo

The first step is to fork the repo you’d like to contribute to. GitHub does that for you, simply search for the fork-button:

![](/blog/assets/imgs/contribute-github/forkbutton.png)

This will automatically create a copy of the repository under your own GitHub user profile.

![](/blog/assets/imgs/contribute-github/forkedrepo.png)

### Step 2: Clone your forked repo

Now that you have a copy within your own GitHub user profile, you have full read/write access and you’re ready to apply your change/feature implementation to the codebase. Clone your fork and start coding.

At this point we have to speak about "git flow". This term comprises a couple of strategies and good practices when working with git. Here are a couple of helpful articles:

- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
- [Implementing the "Git flow"](/blog/2014/09/implementing-the-git-flow/).

If you don’t wanna dive into it right now, at least create a **feature branch** for your change. This is highly recommended.

```
$ git checkout -b my-new-feature
```

Now it’s time to code: implement your changes.

### Step 3: Polish your history, squash unnecessary commits

Usually when you develop, you may have lots of commits, even intermediate ones, with commit messages that probably only you understand (if even.. :grin:).

Use `git rebase` to polish your history and only include those that are relevant and help the author to more easily review your changes. Here’s how to do it: [Polish your feature branch commits](/blog/2013/04/git-explained/#Polishingyourfeaturebranchcommits).

![](/blog/assets/imgs/git-clean-history.gif)

### Step 4: Push it to your forked repository

Now, push your branch to your repo:

```
$ git push --set-upstream origin my-new-feature
```

### Step 5: Submit your PR

Once you pushed your branch to your repo, simply open it on GitHub. A prominently highlighted message should appear, inviting you to create a PR.

![](/blog/assets/imgs/contribute-github/github-pr-message.png)

Click the "Compare & pull request" button and fill out the details. 

**Wohooo, you did it! Your PR is done!** :smile:

[GitHub also has an excellent guide](https://help.github.com/articles/using-pull-requests/) on how to do it.

> **Btw,** you can simply push additional commits to your forked repo’s feature branch and they’ll automatically appear on your PR.

## Link/Sync with the original repo

If your contribution was a one-time bugfix, you can also delete the repo once it is merged. Instead, if you intend to contribute further changes, you might want to setup a link to the original repository s.t. you can update your own repo’s master from now and then.

This is done by **adding another git remote** that points to the original GitHub repository

```
$ git remote add upstream 	<the repo url>
```

Once you have that, you can sync it by doing

```
$ git checkout master
$ git pull upstream master
```

Or with a `git fetch` followed by a `git merge` (based on your prefs).

Here’s the [GitHub Help page article that might also help](https://help.github.com/articles/fork-a-repo/#keep-your-fork-synced).

## Conclusion

Contributing is vital for keeping the Open Source ecosystem alive, and you learn a lot while doing so! At the same time, though, respect the author’s guidelines, be polite and, use Emojis, they’re there with a good reason! :smile: :wink: :joy: :+1: :clap: :octocat: [_(this might be useful)_](http://www.emoji-cheat-sheet.com/)
