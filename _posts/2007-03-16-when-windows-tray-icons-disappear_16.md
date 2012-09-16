---
layout: post
title: "When Windows tray-icons disappear misteriously"
date: 2007-03-16
comments: false
tags: [  Windows OS ]
---

Recently when starting my computer, I noticed that some icons were missing in the notification area (how the tray-icon area is called on XP). Mainly [AntiVir](http://www.avira.com/en/pages/index.php), [Sygate Personal Firewall](http://www.google.com/search?source=ig&hl=en&amp;q=sygate+personal+firewall&btnG=Google+Search) and the [Intel PROSet Wireless tool](http://www.intel.com/network/connectivity/products/wireless/proset/proset_software.htm) were missing. 

The problem was that it seemed that the tools were running anyway in the background, since for example when starting the PROSet Wireless tool the following message showed up:

> Another wireless network utility is communicating with the Intel PRO/Wireless adapter. To avoid conflicts, Intel's profile management features have been temporarily disabled.

But I had no other tool installed...

After doing a websearch and a posting to a [forum](http://www.hackerboard.de/thread.php?postid=221247#post221247)forum I found out, that it may be a Windows bug. Many people reported similar behaviour of the tray-icons. However their problem was that they had switched on the option of "Show icons for networked UPnP devices" (Under XP: Click on the Desktop on "My Network Places"; on the left panel "Network Tasks" the last item). After switching that option off, their problem was usually solved. That wasn't the case for me, since I had that option already deactivated. There were also indications that such problems often happen with users which use the "autologon" option under Windows. Apparently this is because some applications contact the notification area bar for adding their icon before the bar is ready to accept them. I tried it out but nothing *mad*.

Finally I checked the autorun entries in the registry using [AutoRuns](http://www2.blogger.com/www.microsoft.com/technet/sysinternals/utilities/autoruns.mspx) and discovered that for some reason all the entries of AntiVir have been removed. So that was easy to fix:

 - open registry (Start-->Run type "regedit")
 - go to the location HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion</span>\Run
 - right-click + New + String value; give it an appropriate name
 - identify the location of the application to start (for AntiVir in my case: "C:\Program Files\<span class="blsp-spelling-error" id="SPELLING_ERROR_5">AntiVir</span> <span class="blsp-spelling-error" id="SPELLING_ERROR_6">PersonalEdition</span> Classic\<span class="blsp-spelling-error" id="SPELLING_ERROR_7">avgnt</span>.<span class="blsp-spelling-error" id="SPELLING_ERROR_8">exe</span>"
 - double-click on the before created registry entry and add as value the location of the program

So the problem of <span class="blsp-spelling-error" id="SPELLING_ERROR_9">AntiVir</span> was fixed...I cannot imagine why and how it was deleted from the registry, but anyway, it works now.

What regards the Intel PROSet Wireless Toolkit I have to reinstall it, since it seems to be broken. When starting the application, the icon doesn't appear, although I set the option of displaying an icon in the notification area. Opening the settings of PROSet Wireless and closing it again solves the problem...however this isn't very desirable to do every time you launch the application.