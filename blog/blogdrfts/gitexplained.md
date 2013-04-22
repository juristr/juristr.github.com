---
layout: post
title: "Git Explained: For Beginners"
description: ""
postimg: "/blog/assets/imgs/XXXX.png"
show_img_in_detail: false
postheadline: "Git For Beginners"
category:
tags: [Git]
---

I'm working with Git now for more than a year, only on my personal projects and those I have on GitHub however. At work we still use TFS and SVN (as of now). Recently [Paolo Perrotta](https://twitter.com/nusco) came to our company to hold a course about Agile planning where he also quickly explained Git in the context of refactoring. I really liked his approach of explaining it and that's why I'd like to replicate his explanation here.

## Git is an advanced File System

His approach was to explain Git from the perspective of the tree which it constructs behind the scenes somehow.

As such in this tutorial I'd like to take a look at how Git works by viewing a git repo from the point of view of a tree (which it is actually). I'll walk through some common use cases like

- adding/modifying a new file
- creating and merging a branch with and without merge conflicts
- rebasing aka "changing the history"

## Create a new Git Repository

Before starting, lets create a new directory where the git repository will live and `cd` into it:

    $ mkdir mygitrepo
    $ cd mygitrepo

Now we're ready to initialize a brand new git repository.

    $ git init
    Initialized empty Git repository in c:/projects/mystuff/temprepos/mygitrepo/.git/

We can check for the current status of the git repository by using

    $ git status
    # On branch master
    #
    # Initial commit
    #
    nothing to commit (create/copy files and use "git add" to track)

## Create and commit a new file

The next step is to create a new file and add some content to it.

    $ touch hallo.txt
    $ echo Hello, world! > hallo.txt

Again, checking for the status now reveals the following

    $ git status
    # On branch master
    #
    # Initial commit
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    #
    #       hallo.txt
    nothing added to commit but untracked files present (use "git add" to track)

To **"register"** the file for committing we need to **add** it to git using

    $ git add hallo.txt

Checking for the status now indicates that the file is ready to be committed:

    $ git status
    # On branch master
    #
    # Initial commit
    #
    # Changes to be committed:
    #   (use "git rm --cached <file>..." to unstage)
    #
    #       new file:   hallo.txt
    #

We can now **commit** it to the repository

    $ git commit -m "Add my first file"
      1 file changed, 1 insertion(+)
      create mode 100644 hallo.txt

> It is common practice to use the "presence" in commit messages. So rather than writing "added my first file" we write "add my first file".

So if we now step back for a second and take a look at the tree we would have the following.

<figure>
    <img src="/blog/assets/imgs/gitrepo_tree1.png" />
    <figcaption>State of the repo tree after 1st commit</figcaption>
</figure>

There is _one node_ where the "label" _master_ points to.

## Adding another file

Lets add another file:

    $ echo "Hi, I'm another file" > anotherfile.txt
    $ git add .
    $ git commit -m "add another file with some other content"
      1 file changed, 1 insertion(+)
      create mode 100644 anotherfile.txt

Btw, note that this time I used `git add .` which adds all files in the current directory (`.`).

From the point of view of the tree we now have another node and master has moved on to that.

![](/blog/assets/imgs/gitrepo_tree2.png)

## Creating a (feature)branch

Branching is why git is so powerful....

    $ git branch my-feature-branch

Executing

    $ git branch
    * master
      my-feature-branch

we get a list of branches. The `*` in front of `master` indicates that we're currently on that branch. Lets switch to `my-feature-branch` instead:

    $ git checkout my-feature-branch
    Switched to branch 'my-feature-branch'

Again

    $ git branch
      master
    * my-feature-branch

> Note you can directly use the command `git checkout -b my-feature-branch` to _create_ and _checkout_  a new branch in one step.

Lets modify one of our existing files

    $ echo "Hi" >> hallo.txt
    $ cat hallo.txt
    Hello, world!
    Hi

...and then commit it to our new branch

    $ git commit -a -m "modify file adding hi"
    2fa266a] modify file adding hi
    1 file changed, 1 insertion(+)

> **Note**, this time I used the `git commit -a -m` to add and commit a modification in one step. This works only on files that have already been added to the git repo before. New files won't be added this way and need an explicit `git add` as seen before.

What about our tree?

![](/blog/assets/imgs/gitrepo_tree3.png)

So far everything seems pretty normal and we still have a straight line in the tree, but note that now `master` remained where it was and we moved forward with `my-feature-branch`.

Lets switch back to master and modify the same file there as well.

    $ git checkout master
    Switched to branch 'master'

As expected, `hallo.txt` is unmodified:

    $ cat hallo.txt
    Hello, world!

Lets change and commit it on master as well (this will generate a nice _conflict_ later).

    $ echo "Hi I was changed in master" >> hallo.txt
    $ git commit -a -m "add line on hallo.txt"
    c8616db] add line on hallo.txt
    1 file changed, 1 insertion(+)

Our tree now visualizes the branch:

![](/blog/assets/imgs/gitrepo_tree4.png)
