---
published: false
---

Intro bla bla bla...

Originally we had a library containing all of the helper utilities divided into technology agnostic stuff into a `Siag.Base` and web specific into a `Siag.Web`. The structure was similar to

- (Dir) Siag.Base
  - Configuration
  - Validation
  - Security
  - ...
  
and

- (Dir) Siag.Web
  - Security
  - Mvc
  - Validation
  - ...
  
That turned out to be not so ideal over time as you got the entire set of imports in a project even if you - for example - just required the class in the `Siag.Base.Configuration namespace`. Moreover this made it more difficult to advance the libraries and keep the versioning clean.

As such...decided to extract and split as also modern package managers like NuGet....semantic versioning etc...

So what I wanted to achieve is to move all of the validation utilities, that means into a file structure like:

Structure:

- (DIR) Siag.Validation
  - (DIR) Siag.Validation
    - (migrated content here..)
    - Siag.Validation.csproj
  - Siag.Validation.sln
  
## What about version history

A thing you definitely don't wanna loose is your version history, especially when you have a codebase that grew over years.

## Toolbox: Ho to export your existing TFS project

Fortunately Microsoft released **[git tf](http://gittf.codeplex.com/)** which is of great help for this undertaking. Make sure you download the latest version for eventual bugfixes.

### Locate your TFS repository and clone it
The first step is to locate your TFS server's url and the project's corresponding location. Once you have that, execute

	git tf clone http://yourtfsserver:8080/tfs/colletionname $/TeamProjectA/Main --deep
    
You can find this command on the [Codeplex docs](http://gittf.codeplex.com/wikipage?title=Clone&referringTitle=Home) of git-tf. Note, remember to include **--deep** to extract the entire version history. Otherwise only the last changeset will be fetched.

Unfortunately git-tf creates a git tag for each TFS changeset. That's quite annoying and not very useful..basically something you don't wanna have in a clean git repo. To remove all of them locally execute

	git tag -l | xargs git tag -d
    
If you accidentally already pushed them to your remote, this command might be helpful as well

	$ git ls-remote --tags origin | awk '/^(.*)(\s+)(.*[0-9])$/ {print ":" $2}' | xargs git push origin


## Step 1: Clone validation namespace

The first step is to clone the `Siag.Base.Validation` namespace which resides in the `/Neptune/Siag.Base/Validation` directory

	git tf clone http://ourtfsserver:8080/tfs/ourcollectionname $/Neptune/Siag.Base/Validation Siag.Validation --deep

You should now have
