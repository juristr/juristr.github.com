---
published: false
---

Intro bla bla bla...

## Export your existing TFS project

Fortunately Microsoft released **[git tf](http://gittf.codeplex.com/)** which is of great help for this undertaking. Make sure you download the latest version for eventual bugfixes.

### Locate your TFS repository and clone it
The first step is to locate your TFS server's url and the project's corresponding location. Once you have that, execute

	git tf clone http://yourtfsserver:8080/tfs/colletionname $/TeamProjectA/Main --deep
    
You can find this command on the [Codeplex docs](http://gittf.codeplex.com/wikipage?title=Clone&referringTitle=Home) of git-tf. Note, remember to include **--deep** to extract the entire version history. Otherwise only the last changeset will be fetched.

Unfortunately git-tf creates a git tag for each TFS changeset. That's quite annoying and not very useful..basically something you don't wanna have in a clean git repo. To remove all of them locally execute

	git tag -l | xargs git tag -d
    
If you accidentally already pushed them to your remote, this command might be helpful as well

	$ git ls-remote --tags origin | awk '/^(.*)(\s+)(.*[0-9])$/ {print ":" $2}' | xargs git push origin
