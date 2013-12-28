---
layout: post
title: "Deploying: Git vs. TFS Showdown"
description: ""
category: 
tags: [tooling]
postimg: /blog/assets/imgs/repo_deploy_git.png
reposts: ["http://agile.dzone.com/articles/deploying-git-vs-tfs-showdown", "http://www.dotnetcodegeeks.com/2012/11/deploying-git-vs-tfs-showdown.html"]
---


I think everyone agrees deployment should be as simple as possible. Seems like everyone talks about continuous integration/deployment/delivery. More and more people (and cloud providers) start using the source control mgmt system as their deployment solution. Especially Git seems to be quite suitable for that, i.e. you push to a dedicated "deploy" branch which is being automatically fetched, build and deployed by some robot. Git's distributed approach makes this easy, but would that be possible with TFS as well?

Recently I started a small company internal utility project together with a work mate. As a deployment solution my mate suggested to use a cron job on the server which performs a TFS checkout from some location on our VCS server. Sounds cool, so we opted for that approach. But it turned out to not immediately run as smoothly as expected.

## The Project Structure
The project's structure on the file system looks like the following:

<ul>
    <li>
        Main
        <ul>
            <li>
                src
                <ul>
                    <li>frontend</li>
                    <li>library</li>
                </ul>
            </li>
            <li>release</li>
            <li>release.bat</li>
        </ul>
    </li>
</ul>

The `release.bat` file basically does the following:

1. `rm -rf` of the contents of the release folder
2. compression of the JavaScript files from the frontend folder
3. compression of the JavaScript files of the library folder
4. xcopy of the results into the release folder

The subsequent step would then be to execute a checkin of the modifications. Let's see how this behaves when I 

- add a new file
- remove an existing
- edit an existing

when using Git vs. TFS clients.

## Using Git
Assume I have already setup a git repo on the releases folder. I execute the above mentioned changes, that is, adding a new file, modifying one and finally removing an existing one. If I then open the [Windows GitHub Client](http://windows.github.com), it immediately recognizes the changes

![](/blog/assets/imgs/repo_deploy_git.png)

So concluding the deploy cycle is as simple as entering a commit msg and then pushing the changes to the remote Git repository.

## Using TFS
What about using TFS? Again, assume I have already a TFS workspace on that folder. Note that I do all the operations happen outside the TFS client's control as they are executed through the automated batch script. So executing the above workflow (adding/modifying/deleting some files), the most natural thing would be to execute a checkin on the releases folder. Note that in order to use TFS outside Visual Studio I'm using the TFS Power Tools (2010) which allow to directly execute checkins from the Windows Explorer.

![](/blog/assets/imgs/repo_deploy_tfsnochanges.png)

Huh?!? Well the problem is that - as mentioned - all the changes happen outside the control of the TFS client because we are directly executing deletes and modifications without explicitly performing a TFS checkout or TFS delete as the TFS client would expect. That poses quite some problems because we cannot perform those TFS operations for each file in an automated deployment script (or at least to easily).

Happily there is a command to solve this problems: `tfpt online`. It basically does a compare of the local modifications with those on the server and proposes the operations to be executed (i.e. tfs add/delete/edit) to return into a synched state which can then be committed to the repository. The command to be executed would thus look as follows:

    tfpt online .\release /recursive /adds /deletes /noprompt

This results in the following output

    Getting your pending changes from the server...
    Checking the status of C:\projects\applications\logging\Main\release... Done
    Walking C:\projects\applications\logging\Main\release... Found 4

    Edits:

    release\admin:
    config.js

    Adds:

    release:
    aNewFile.txt

    Deletes:
    New Microsoft Office Word Document.docx

By then - again - performing a TFS checkin we get what we expected

![](/blog/assets/imgs/repo_deploy_tfschanges.png)

## Conclusion
I guess the winner here in terms of simplicity is quite clear. Using Git just feels natural in that we do our modifications and then simply commit the changes to the server. It should be up to the tool to detect the differences. TFS on the other side delegates this task to the IDEs, wherefore when being used outside of their control, it performs poorly and feels very clumsy. To its defense however it is to say that my tests were against TFS 2010 and not the newest 2012 version which apparently is assumed to solve some of the issues like readonly flags on the filesystem etc.
