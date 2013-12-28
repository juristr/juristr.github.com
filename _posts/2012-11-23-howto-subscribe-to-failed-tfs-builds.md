---
layout: post
title: "HowTo: Subscribe to Failed TFS Builds"
description: ""
category: bliki
postimg: /blog/assets/imgs/buildnotificationtool.png
tags: [ "Visual Studio", "HowTo"]
reposts: ["http://dotnet.dzone.com/articles/howto-subscribe-failed-tfs"]
---


When you use a build server it is a must to get notified in case of build failures. Microsoft's Team Foundation server has different possibilities to achieve this: using the Build Notification Tool or through so-called Alerts.

One of the prerequisites is the installation of the latest Team Foundation Power tools. You should find them easily by just [googling](https://www.google.it/search?q=Install+Team+Foundation+Power+Tools&oq=Install+Team+Foundation+Power+Tools).

## Build Notification Tool
The build notification tool is a rather small windows tool that lets you subscribe to your different TFS builds.

![](/blog/assets/imgs/buildnotificationtool_subscriptions.png)

You then get notified with IM messenger like notifications.

![](/blog/assets/imgs/buildnotificationtool.png)

The tool is very beta however. Most often it has quite some delays in the notifications and there are a couple of bugs in the subscription dialog. The little red/green icon in the taskbar immediately notifies you about any problems in your builds.

## TFS Alerts
Another possibility is to use the TFS alerts to get notified via email. Normally you can just right-click on the project of your team project and open the project alerts dialog.

![](/blog/assets/imgs/simplealertdialog.png)

There you can register yourself for any **build quality change**. That might just work fine for you. However, if you'd like to get **notified only for failing builds** then you have to define a separate alert definition.

### Create Failed Build Alert Definition

> **Note:** So far I've not found a way to achieve this in VS2012.

To create a custom alert definition for only failing builds you have to open VS2010 (with installed TFS power tools) and go to the menu `Team > Alerts Explorer`.

![](/blog/assets/imgs/alertsexplorer_menu.png)

That should open the Alerts Explorer view where you can see all of the defined alerts.

![](/blog/assets/imgs/alertexplorer_window.png)

Click on the "New Alert" button in the toolbar.

![](/blog/assets/imgs/alertexplorer_createnewdialog.png)

Then define the condition for being notified. For instance

![](/blog/assets/imgs/alertexplorer_alertdefinition.png)

Save it and it should work then.


