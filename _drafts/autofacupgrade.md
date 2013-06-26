---
layout: post
title: "Upgrading AutoFac to version 3.x"
description: ""
category:
postimg: /blog/assets/imgs/autofacsyscoredllerror.png
tags: []
---

Today I deployed a webapp on our dev server and bam, YSOD:

<pre class="nohighlight">
Could not load file or assembly 'System.Core, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e, Retargetable=Yes' or one of its dependencies. The given assembly name or codebase was invalid. (Exception from HRESULT: 0x80131047)
</pre>

Only later I found that apparently AutoFac is the "culprit" and after searching a bit I found an official note on its [wiki page](https://code.google.com/p/autofac/wiki/FrequentlyAskedQuestions):

> Autofac (as of 3.0) is a Portable Class Library that targets multiple platforms. One of the artifacts of that is that it appears to reference the Silverlight versions of the .NET framework.
> You may encounter an exception that looks something like this when using Autofac as a Portable Class Library: [...]

Their suggestion is to make sure the latest .Net framework patches are installed on the webserver, in specific they point to the [KB2468871](http://support.microsoft.com/kb/2468871).

Portable
http://stackoverflow.com/questions/5238955/what-is-a-portable-class-library



