---
title: Automating the build of MSI setup packages on Jenkins
show_img_in_detail: false
coverimage: false
categories:
  - ".Net"
reposts:
  - 'http://java.dzone.com/articles/automating-build-msi-setup'
date: 2014-03-12T01:00:00.000Z
comments: true
url: /blog/2014/03/Jenkins-Build-Setup-Project
type: post
---

A short "how-to" based on an issue one of my work mates recently faced when trying to automate the creation of an MSI package on Jenkins.

Normally, Visual Studio solutions can be build on Jenkins by using the appropriate [MSBuild plugin](https://wiki.jenkins-ci.org/display/JENKINS/MSBuild+Plugin). Apparently though, for Visual Studio setup projects, MSBuild cannot be used and one has to switch to using Visual Studio itself to execute the build.

So the first approach was to use `devenv.exe` as follows

    devenv.exe VisualStudioSolution.sln /build "Release"

While this works, the problem is that it is an "async call", meaning that the compilation goes on in the background while the console from which the build is executed, immediately returns. Obviously this isn't suited for being used on Jenkins. Searching around for a while, it turned out that you **have to use devenv.com instead of devenv.exe**:

    "C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE\devenv.com" VisualStudioSolution.sln /build "Release"

Once you got that, integrating everything into Jenkins is quite straightforward:

![](/blog/assets/imgs/jekins_setupprojectbuild.png)

_(Obviously you may also simply set an environment variable pointing to `devenv.com` on your build server rather than indicating the entire path)_
