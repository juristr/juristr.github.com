---
layout: post
title: "Git Explained: For Beginners"
description: ""
postimg: "/blog/assets/imgs/XXXX.png"
show_img_in_detail: false
postheadline: "> git init"
category:
tags: [Git]
---

I'm working with Git now for about two years, only on my personal projects and those I have on GitHub however. At work we still use TFS and SVN (as of now). Recently [Paolo Perrotta](https://twitter.com/nusco) came to our company to hold a course about Agile planning where he also quickly explained Git in the context of refactoring. I really liked his approach of explaining it and that's why I'd like to replicate his explanation here.

Git sits on top of your file system and manipulates files as you jump around on a Git repository. You can imagine Git as a **tree** structure where **each commit creates a new node** in that tree. Nearly all Git commands serve to navigate on this tree and to manipulate it accordingly. In fact, there are nearly no limits on what can be done. Moreover, each node only stores the diff to its ancestor which makes Git extremely powerful in terms of speed and memory consumption.

As such in this tutorial I'd like to take a look at how Git works by viewing a Git repository from the point of view of the tree it constructs. To do so I walk through some common use cases like

- adding/modifying a new file
- creating and merging a branch with and without merge conflicts
- Viewing the history/changelog
- Performing a rollback to a certain commit
- Sharing/synching your code to a remote/central repository

Note, I perform all of these operations on the command line. Even if you're not the shell-guy you should till give it a try to get comfortable with it to follow the examples in this post.

## Terminology

Here's the git terminology:

- **master - ** the repository's main branch. Depending on the work flow it is the one people work on or the one where the integration happens
- **clone - ** copies an existing git repository, normally from some remote location to your local environment.
- **commit - ** submitting files to the repository; in other VCS it is often referred to as "checkin"
- **fetch or pull - ** is like "update" or "get latest" in other VCS. The difference between fetch and pull is that pull combines both, fetching the latest code from a remote repo as well as performs the merging.
- **push - ** is used to submit the code to a remote repository
- **remote - ** these are "remote" locations of your repository, normally on some central server.
- **SHA - ** every commit or node in the Git tree is identified by a unique SHA key. You can use them in various commands in order to manipulate a specific node.
- **head - ** is a reference to the node to which the repository currently points. 
- **branch - ** is just like in other VCS with the difference that a branch in Git is actually nothing more special than a particular label on a given node. It is not a physical copy of the files as in other popular VCS.

## Lets get started: Create a new Git Repository

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

## Add another file

Lets add another file:

    $ echo "Hi, I'm another file" > anotherfile.txt
    $ git add .
    $ git commit -m "add another file with some other content"
      1 file changed, 1 insertion(+)
      create mode 100644 anotherfile.txt

Btw, note that this time I used `git add .` which adds all files in the current directory (`.`).

From the point of view of the tree we now have another node and master has moved on to that one.

![](/blog/assets/imgs/gitrepo_tree2.png)

## Create a (feature)branch

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

## Merge and resolve conflicts

The next step would be to merge our feature branch back into `master`. This is done by using the merge command

    $ git merge my-feature-branch
    Auto-merging hallo.txt
    CONFLICT (content): Merge conflict in hallo.txt
    Automatic merge failed; fix conflicts and then commit the result.    

As expected, we have a merge conflict in `hallo.txt`.

    Hello, world!
    <<<<<<< HEAD
    Hi I was changed in master
    =======
    Hi
    >>>>>>> my-feature-branch

Lets resolve it:

    Hello, world!
    Hi I was changed in master
    Hi

..and then commit it

    $ git commit -a -m "resolve merge conflicts"
    [master 6834fb2] resolve merge conflicts

The tree reflects our merge.

<figure>
    <img src="/blog/assets/imgs/gitrepo_tree5.png" />
    <figcaption>Fig 1: Tree state after the merge</figcaption>
</figure>

## Jump to a certain commit

Lets assume we want to jump back to a given commit. We can use the `git log` command to get all the SHA identifiers that uniquely identify each node in the tree.

    $ git log
    commit 6834fb2b38d4ed12f5486ebcb6c1699fe9039e8e
    Merge: c8616db 2fa266a
    Author: = <juri.strumpflohner@gmail.com>
    Date:   Mon Apr 22 23:19:32 2013 +0200

        resolve merge conflicts

    commit c8616db8097e926c64bfcac4a09306839b008dc6
    Author: Juri <juri.strumpflohner@gmail.com>
    Date:   Mon Apr 22 09:39:57 2013 +0200

        add line on hallo.txt

    commit 2fa266aaaa61c51bd77334516139597a727d4af1
    Author: Juri <juri.strumpflohner@gmail.com>
    Date:   Mon Apr 22 09:24:00 2013 +0200

        modify file adding hi

    commit 03883808a04a268309b9b9f5c7ace651fc4f3f4b
    Author: Juri <juri.strumpflohner@gmail.com>
    Date:   Mon Apr 22 09:13:49 2013 +0200

        add another file with some other content

    commit aad15dea687e46e9104db55103919d21e9be8916
    Author: Juri <juri.strumpflohner@gmail.com>
    Date:   Mon Apr 22 08:58:51 2013 +0200

        Add my first file    

Take one of the identifiers (also if it isn't the whole one, it doesn't matter) and jump to that node by using the `checkout` command

    $ git checkout c8616db
    Note: checking out 'c8616db'.

    You are in 'detached HEAD' state. You can look around, make experimental
    changes and commit them, and you can discard any commits you make in this
    state without impacting any branches by performing another checkout.

    If you want to create a new branch to retain commits you create, you may
    do so (now or later) by using -b with the checkout command again. Example:

      git checkout -b new_branch_name

    HEAD is now at c8616db... add line on hallo.txt

Note the comment git prints out. What does that mean? Basically when I now change hallo.txt and commit the change, the tree looks as follows:
<figure>
    <img src="/blog/assets/imgs/gitrepo_tree6.png" />
    <figcaption>Detached head state</figcaption>
</figure>

As you can see, the newly created node has no label on it. The only reference that currently points towards it is `head`. However, if we now switch to master again then the previous commit will be lost as we have no way of jumping back to that tree node.

    $ git checkout master
    Warning: you are leaving 1 commit behind, not connected to
    any of your branches:

      576bcb8 change file undoing previous changes

    If you want to keep them by creating a new branch, this may be a good time
    to do so with:

     git branch new_branch_name 576bcb8239e0ef49d3a6d5a227ff2d1eb73eee55

    Switched to branch 'master'    

And in fact, git is so kind to remind us about this fact. The tree looks now again as in figure 6.

## Rollback

Jumping back is nice, but what if we want to **undo** everything back to the state before the merge of the feature branch? It is as easy as

    $ git reset --hard c8616db
    HEAD is now at c8616db add line on hallo.txt

<figure>
    <img src="/blog/assets/imgs/gitrepo_tree4.png"/>
    <figcaption>The tree after the reset</figcaption>
</figure>

The generic syntax here is `git reset --hard <tag/branch/commit id>`.

## Sharing/Synching your Repository

Ultimately we want to share our code.

## Resources and Links

- http://gitready.com/
- http://stackoverflow.com/questions/927358/how-to-undo-the-last-git-commit
