---
type: post
title: Productive Git for Developers
lead: >-
  Learn some solid, proven day-to-day Git commands for your daily use
date: 2019-04-16T10:00:00+01:00
comments: true
url: /blog/2019/04/productive-git-for-developers
image: /blog/assets/imgs/productive-git-logo.png
categories:
  - Git
  - Egghead
tags:
  - git
  - egghead
  - videos
---

{{<intro>}}
  With this Egghead course, I aim at a different goal. You will walk through a series of scenarios which you’ll most commonly encounter in your daily work life as a developer.
{{</intro>}}
<!--more-->

{{< postad >}}

With regards to version control systems, I first used CVS for a very short time and then SVN before starting my first real job where the company has been using TFS (Team Foundation Server). TFS was similar to SVN with the possibility of "blocking" access to files. A way to avoid merge conflicts. It's very synchronous and that works as long as you're alone or with 2 people on the team, but it definitely doesn't scale (not to mention what happens if someone leaves for vacation & forgot to checkin).

Ultimately that checkout => lock => checkin workflow didn't work any more. Moreover branching/merging was a pain. That was when Git became more popular and I started giving it [a closer look](https://juristr.com/blog/2010/11/juri-goes-git-first-steps/) (yes this blog post is reeeeallly old :smiley:). So I got the assignment to check out git more in depth and finally move our teams (yep multiple) over to using Git. 

As you know **Git is really powerful, but with great power comes great responsibility**. That was even more true when you start from TFS where files are actually being locked. You simply need workflows, how to use git, when to branch, how to merge them back and so on. Otherwise you'll end up in a big mess. At that time there were already different workflows available, the Git Flow approach, later the GitHub Flow and GitLab Flow came along. I was always inspired by a more [trunk based development](https://trunkbaseddevelopment.com) scenario. Where you have one main line (be it trunk or master or whatever you wanna call it), where people integrate quickly and often. Keeping long-lived branches are nearly always going to end up in a lot of work and merging mess.

Anyways, to come to a conclusion point. Over the years I've worked with many different teams and most always I've seen people fight with Git merges, or use strange workflows (like manually copying folders for backup). Many didn't know about utterly simple commands which can make a big impact in your day to day workflow. So after years I **finally decided to sit down and record a series of videos**, showing some real-world recipes & according Git commands I'm using on a daily basis. Nothing too fancy, but rather just a few simple commands that will help you do the job.

## Egghead: Productive Git for Developers

{{<egghead-course uid="courses/productive-git-for-developers" lesson_img="/blog/assets/imgs/productive-git-logo.png" >}}

With this course, I aim at a different goal. You will walk through a series of scenarios which you’ll most commonly encounter in your daily work life as a developer. I’m talking:

- updating your feature branch with the latest changes from master
- polishing your git history to make it ready for being peer-reviewed
- moving a set of commits to another branch
- undoing accidental commits

The goal is not to cover everything, but those tasks that will greatly improve your daily productivity with Git. If you're interested, check it out [over on Egghead.io](https://egghead.io/courses/productive-git-for-developers?af=fj2vsx).

Here are the current lessons on the course (will be updated over time with new ones as well):

- [Only commit some of my currently modified files into the repository](https://egghead.io/lessons/git-only-commit-some-of-my-currently-modified-files-into-the-repository?af=fj2vsx)
- [Make my git log look pretty and readable](https://egghead.io/lessons/git-make-my-git-log-look-pretty-and-readable?af=fj2vsx)
- [Move some commits to a separate branch that I have accidentally committed to master](https://egghead.io/lessons/git-move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master?af=fj2vsx)
- [Update my feature branch with the latest changes from master](https://egghead.io/lessons/git-update-my-feature-branch-with-the-latest-changes-from-master?af=fj2vsx)
- [Push a rebased local branch by using `--force-with-lease`](https://egghead.io/lessons/git-push-a-rebased-local-branch-by-using-force-with-lease?af=fj2vsx)
- [Polish my git feature branch before merging or submitting for review](https://egghead.io/lessons/git-polish-my-git-feature-branch-before-merging-or-submitting-for-review?af=fj2vsx)
- [Automate the cleanup of my feature branch with Git Autosquash](https://egghead.io/lessons/git-automate-the-cleanup-of-my-feature-branch-with-git-autosquash?af=fj2vsx)
- [Squash all of my commits into a single one and merge into master](https://egghead.io/lessons/git-squash-all-of-my-commits-into-a-single-one-and-merge-into-master?af=fj2vsx)
- [Change the commit message of my last commit](https://egghead.io/lessons/git-change-the-commit-message-of-my-last-commit?af=fj2vsx)
- [Add a file I’ve forgotten to add to my last commit](https://egghead.io/lessons/git-add-a-file-i-ve-forgotten-to-add-to-my-last-commit?af=fj2vsx)
- [Undo my last commit and split it into two separate ones](https://egghead.io/lessons/git-undo-my-last-commit-and-split-it-into-two-separate-ones?af=fj2vsx)
- [Wipe a commit from my local branch](https://egghead.io/lessons/git-wipe-a-commit-from-my-local-branch?af=fj2vsx)
- [Undo a commit that has already been pushed to the remote repository](https://egghead.io/lessons/git-undo-a-commit-that-has-already-been-pushed-to-the-remote-repository?af=fj2vsx)
- [Temporarily store some work in progress because I have to jump to another branch](https://egghead.io/lessons/git-temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch?af=fj2vsx)

Let me know what you think :smiley:
