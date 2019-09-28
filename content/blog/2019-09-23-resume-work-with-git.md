---
type: post
title: "Resume your Work with Git"
lead: Learn some protip on how to get back to work after a long weekend.
date: 2019-09-23T22:27:34+02:00
comments: true
url: /blog/2019/09/resume-work-with-git
image: /blog/assets/imgs/git-resume-bg.jpg
categories:
  - Git
tags:
  - git
  - tooling
draft: false
---

{{<intro>}}
  Git is an essential tool for every software developer and something you should know well in order to keep your productivity high. Knowing all about git is quite impossible 😃, but there are some basic workflows which will dramatically improve your devlife. Today let’s take a look at how to resume your work after the weekend.
{{</intro>}}
<!--more-->

{{< postad >}}

## First off, always create a branch

I (mostly) always create a new branch when working on something. The branch is usually just my personal one without anyone else interacting with it. This fact is important as it allows me to change it, rebase it, modify it's commits and "force push" it back up to the origin branch. Without any fear of messing up with any of my colleagues. Such a branch should also only **have a single responsibility**, in the sense that it only contains things that matter for that feature/bugfix/refactoring whatever. If a work mate passes by and asks me to fix something that’s totally unrelated, then I’ll jump over to master & create a new separate one (or directly commit as per rule mentioned before).

**Why?** Well,

- it allows me to **quickly switch context** (features, bugfixes, experiments). If you intermingle multiple features/fixes in the same branch, you have no chance but release them all at once.
- undoing is easy, just delete the branch
- pushed up to the remote, it automatically goes through CI and tests are being executed against the changes of that specific branch

But enough for that.

## Back to the topic, resuming work

What do I mean by “resuming work”? Think about the following: you’re working on a feature on Thursday and Friday and you’re not done yet. You push up your branch to the remote repository as usual (just to have a backup copy online in case your computer blows up) :wink:.

```
$ git commit -am 'feat: allow user to save list filters'
$ git push
```

With that you’re done and ready for the weekend.

**On Monday** you come back open your code edito...and well...what was I doing again again on Friday 🤔. Happens to you as well? I’m glad 😃. What I usually do then is to…

```
$ git reset HEAD~
```

..on the branch I’m currently working. With that command, the last commit on the branch (the one I made before leaving into the weekend) will be removed again and all files and moved back to the staging area. Thus with `git status` you again see all the files I modified the week before and helps me resume it with ease. **Note!** This should only be done if the branch is a non-shared one, as you're actively modifying the history of that branch.

## Conclusion

As you can see, there's **no need to learn all the Git magic**. Just some simple commands can already improve your Git workflow a lot. Over the years I've worked with different teams and a lot of developers struggle with Git (although it has been around for more than a decade). As such I recorded a **video course** that collects a series of git commands that'll directly help you with your daily development tasks: [https://egghead.io/courses/productive-git-for-developers](https://egghead.io/courses/productive-git-for-developers?af=fj2vsx)
