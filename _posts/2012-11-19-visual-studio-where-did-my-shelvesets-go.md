---
layout: post
title: "Visual Studio: Where Did My Shelvesets Go?"
description: ""
category: 
postimg: /blog/assets/imgs/vs2012_unshelve_menu.png
tags: ["Visual Studio"]
---
{% include JB/setup %}

Do you use the TFS shelvesets?? I do, not regularly, but from now and then they're quite useful for staging or even for sharing some unfinished work with others. Well it seems like the VS engineers cannot decided where to put the menu item for the "unshelve" option.

When switching from VS2008 to VS2010 they removed the "Unselve Pending Changes" from the context menu of the Solution Explorer. Instead you had to take the way through the "File" menu

![](/blog/assets/imgs/vs2010_unshelve_menu.png)

From there a dialog opened presenting all the shelvesets, by default filtered to your own ones:

![](/blog/assets/imgs/vs2010_unshelve_view.png)

**But where is the unshelve pending changes menu in VS2012??** It disappeared even from the `File > Source Control` menu! But if you search for a while, you find them in the `Find` sub-menu option under a slightly different name: "Find Shelvesets"

![](/blog/assets/imgs/vs2012_unshelve_menu.png)

...which in turn opens the Team Explorer

![](/blog/assets/imgs/vs2012_unshelve_view.png)

Hopefully it will now stay where it is.