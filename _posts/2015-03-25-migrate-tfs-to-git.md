---
layout: post
title: "Migrate from TFS to Git"
lead: "You're currently on TFS and would like to migrate to Git? This post shows you how, without loosing your history."
show_img_in_detail: true
coverimage: false
category:
tags: ["git"]
---

Are you using TFS and would like to switch to a distributed VCS like Git? Well then this article might be of help. I quickly wrote down the required steps and some hints for exporting an existing TFS repository to Git.

I actually wrote the notes for this article a couple of years ago, when we switched to Git (with Gitlab) at work. Still, from now and then I have to migrate older projects which reside on TFS onto Git and given Microsoft recently migrated to Git as well internally (at least for their OSS projects), this article might turn out to be relevant :).  
What I wouldn't want to outline is the the details of why we did the switch. It was something related to a more modern, web based interface offered by GitLab, the community basically living on GitHub with Git and the possibility of easy, fast (and local) branching & merging.

<blockquote>
        Other Git related posts you might be interested in:
        <ul>
                <li><a href="/blog/2013/04/git-explained/">Git Explained</a></li>
                <li><a href="/blog/2013/06/getting-started-with-git-and-visualstudio/">Getting Started with Git and Visual Studio</a></li>
                <li><a href="/blog/2014/09/implementing-the-git-flow/">Implementing the Git Flow</a></li>
                <li><a href="/blog/2014/01/git-flow-jenkins-gitlab/">Git Flow with Jenkins and GitLab</a></li>
        </ul>
</blockquote>

So, when migrating you could naively simply copy the files and create a brand new Git repository (with `git init`). But that's usually something you don't wanna do. Especially in a large project you definitely want to keep the repository history. As a result, you need to properly export your TFS repo. That's where gittf comes into play.

## The gittf project

**[gittf](http://gittf.codeplex.com/)** is a project on Codeplex that seems to be driven by Microsoft itself, at least by Microsoft employees.

>Git-TF is a set of cross-platform, command line tools that facilitate sharing of changes between Microsoft Team Foundation Server, Visual Studio Online and Git. [...]  
These tools make it easy to clone sources from TFS, fetch updates from TFS, and update TFS with changes committed locally in Git.

While it is being thought for being able to use git with TFS based central repositories, I never used it that way. Tried it a couple of times, but the idea of having such a "hybrid" situation was too scary for me. Where the tool is useful though, is for our use case of migrating away from TFS to git.

You can either **install** it as described on the gittf codeplex page or simply download the latest version, unzip everything and execute your commands directly from within that directory. Just make sure your system meets the minimum requirements, like having Java installed etc..

## Exporting

The first step is to locate your TFS server's url and the project's corresponding location. That shouldn't be too difficult. Simply look for it in your Visual Studio Source Control Explorer plugin.

>**Note:** I tested all of these commands from the **Git Bash** which is my preferred command line on Windows, especially for interacting with Git.

Once you have the URL, open a console where you have access to git-tf and execute this command (obviously adapting the locations):

```
$ git tf clone http://yourtfsserver:8080/tfs/colletionname $/TeamProjectA/Main --deep
```

You can find this command on the [Codeplex docs](http://gittf.codeplex.com/wikipage?title=Clone&referringTitle=Home) as well. Note, remember to include **--deep** to extract the entire version history. Otherwise only the most recent changeset will be fetched which you wouldn't want in the scenario of a full export.

## Cleaning up

git-tf creates a git tag for each TFS changeset. That might be useful for jumping to a specific TFS commit from within Git. When exporting the repo you usually don't need them. So, to remove all of them on your local git repository, execute

```
$ git tag -l | xargs git tag -d
```

If you accidentally already pushed them to your remote Git repository, this command might turn out to be helpful

``` 
$ git ls-remote --tags origin | awk '/^(.*)(\s+)(.*[0-9])$/ {print ":" $2}' | xargs git push origin
```

If you already happen to have other tags, you can adapt the command shown before to only catch the TFS tags:

```
$ git ls-remote --tags origin | awk '/^(.*)(\s+)(.*TFS.*[0-9])$/ {print ":" $2}' | xargs git push origin
```


## Adjust committer names

Another scenario you might run into is that the **committer names are different on TFS rather than on Git**. Git usually identifies committers by their configured email address, while TFS normally uses your Windows identity. As a result, the same person might be represented by two different "committers" on the Git repository. By the TFS username due to the import and the real git user for new commits that are made on the Git repository. Sure...it's about cosmetics, but still...

Fortunately a quick search on Google brought me to [this Stackoverflow post](http://stackoverflow.com/questions/750172/change-the-author-of-a-commit-in-git), which revealed the `filter-branch` command.

In the **Git bash** use this command:

```
git filter-branch -f --commit-filter '
        if [ "$GIT_COMMITTER_NAME" = "<old TFS user>" ];
        then
                GIT_COMMITTER_NAME="<new name>";
                GIT_AUTHOR_NAME="<new name>";
                GIT_COMMITTER_EMAIL="<new - email>";
                GIT_AUTHOR_EMAIL="<new - email>";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

On the Windows command prompt, use this:

```
git filter-branch -f --commit-filter "
        if [ "$GIT_COMMITTER_NAME" = "<old TFS user>" ];
        then
                GIT_COMMITTER_NAME="<new name>";
                GIT_AUTHOR_NAME="<new name>";
                GIT_COMMITTER_EMAIL="<new - email>";
                GIT_AUTHOR_EMAIL="<new - email>";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi" HEAD
```

## Conclusion

That's it, with these commands, migrating is pretty easy. It might only take some time for exporting, and adjusting the committer names. Obviously this depends on the size of the exported repository.

**Kudos to Alex Rukhlin from Microsoft** who was a big help in debugging and solving some nasty exceptions (and a bug) I encountered during the export with gittf. Thanks man!
