---
layout: post
title: "Transformer TF101 meets Jelly Bean powered by CyanogenMod"
description: ""
category: bliki
tags: [Android]
postimg: /blog/assets/imgs/cmjellybean.png
reposts: ["http://mobile.dzone.com/articles/transformer-tf101-meets-jelly"]
---
{% include JB/setup %}
During the Christmas holidays I found a bit of time to upgrade my old (but still nicely working) Nexus One to CyanogenMod 7 and I'm really happy about that. Today I decided to give my Asus Transformer TF101 a go as well.

![](/blog/assets/imgs/cmjellybean.png)

The problem is that apparently the TF101 doesn't get the update to Jelly Bean and I definitely didn't want to miss it, so [CM](http://www.cyanogenmod.org/) is the best available option. Unfortunately it turned out that rooting and flashing the Transformer TF101 isn't as smooth as I thought and it involved quite a lot of reading through forums till I managed to get it working on my device. As such, this post is intended to provide you with the right information in order to save you some time (and nerves) while upgrading to CyanogenMod.

## Preface ##
Before continuing with this post here, please read through the official [CyanogenMod installation instructions for the TF101][cm_tf101_wiki].

> **Disclaimer:** By following the instructions presented by this page you device gets rooted which voids your device's warranty, may cause data loss or potential other damage. I'm **not responsible** in any way with such side effects but it is **at your own risk**.

### Specs used for this setup ###
The upgrade has been performed on

- Asus Transformer TF101
- Kernel/firmware version 9.2.1.27

by using a _Win7 x64_ setup for rooting the device and flashing ClockworkMod.

## Some Basics ##

**Boot into recovery:** Switch off your device. Then press <kbd>Volume DOWN</kbd>+<kbd>Power button</kbd> till you see the boot logo, then press <kbd>Volume UP</kbd> again.

**Enter APX mode:** Switch off your device, connect it to your computer and press <kbd>Volume UP</kbd>+<kbd>Power button</kbd>.

## Preparation: Download CM and GApps Package ##
Before starting it's good to download the necessary files and immediately place them on the devices internal storage (or sdcard mount) s.t. we have them ready when we need them.

1. [Download][cm_unofficial_downs] the latest (unofficial) CM 10 version (I used cm_tf101-v6).
1. [Download][gapps_latest] the Google Apps package for Jelly Bean v 4.1.2, that is "gapps-jb-20121011-signed.zip".

> Note that this is not an **official CM version** but one build by some XDA developer from the CM's GitHub repository. See [this forum entry](http://forum.xda-developers.com/showthread.php?t=1858295) for more details.

After downloading the above mentioned files, copy them over to your device. If you have [adb installed](http://www.howtogeek.com/125769/how-to-install-and-use-abd-the-android-debug-bridge-utility/) and your device connected via USB debugging this should be as easy as 

    adb push cm_tf101-v6.zip /sdcard/

As of writing this post there is no **official stable Jelly Bean CM10** release or release candidate. Hence in this installation I used an unofficial one. You might get and check the [CM download page for the TF101][cm_tf101], however.

**References**
- [CyanogenMod 10 - Gierdo's Nightly Builds](http://forum.xda-developers.com/showthread.php?t=1858295)
- [CyanogenMod's Google+ post about JB](https://plus.google.com/+CyanogenMod/posts/UhCMjr739TY)
- [How to upgrade TF101 to Jelly Bean](http://www.androidauthority.com/eee-pad-transformer-tf101-android-4-1-stable-cyanogenmod-10-cm10-unofficial-115537/)
- [Upgrade to ClockworkMod 6](http://www.androidauthority.com/eee-pad-transformer-tf101-clockworkmod-recovery-6-touch-recovery-112408/)

## Rooting and Installing ClockworkMod ##
The official [CM TF101 wiki page][cm_tf101_wiki] suggests the use of **Wheelie** for loading ClockworkMod (a custom recovery) onto the Transformer. That approach **didn't work for me**, however. When placing my Transformer into APX mode and after executing the mentioned command (see CM wiki entry), I always got

> Wheelie did not detect a device in APX mode.

So I googled quite a lot and there are lots of entries on the XDA forums with one-click root&flash approaches, however most of them didn't work as well. What you need to pay attention to is the **kernel version (firmware)** you have installed. I had version **9.2.1.27** while many of the root utilities are for older firmware versions which might also be the reason why they didn't work.

### "1-Click Transformer Root" worked!! ###
After a while I finally found the [**1-Click Transformer Root**](http://forum.xda-developers.com/showthread.php?t=1689193) which finally worked. You need Windows 7 (don't know if Win8 works as well) for executing the root processes, however.

The tool makes rooting extremely easy, just follow the steps below:

1. Make sure you connect your running Transformer device to your computer. Also verify that you have USB debugging enabled in your settings.
1. Just download the file and run the "1-Click Transformer Root.bat"
1. Follow the instructions given by the bat file

Your Transformer will boot multiple times and by the end your device should be rooted successfully. 

In order to then **install the custom recovery** (i.e. ClockworkMod) you have to again start the "1-Click Transformer Root.bat" which now will present several options under which point 3 says "Install CWM recovery". Choose that one and proceed. It should install _Rogue XM Recovery 1.5.0_ (CWM-based Recovery v5.0.2.8).

> **Don't use the ROM manager** for flashing ClockworkMod. See [here](http://forum.xda-developers.com/showthread.php?t=1671598) for further details.

_(Note if you aren't able to download the file, just contact me as I should still have it somewhere)_

## Installing CM ##
If you successfully flashed ClockworkMod with the method mentioned before, then the Transformer should now be booted into recovery mode. The next steps involve 

- creating a Nandroid backup
- wiping the data
- installing the CM from zip
- installing the gapps package from zip

Follow the installation instructions on the official [CM wiki page for the TF101][cm_tf101_wiki] for these steps.

### Some Sidenotes ###
**Nandroid backup - ** If it gives you an error when backing up `/data` try to verify whether there is enough space for the backup. In my case I had to delete the Dropbox cache. You may also want to change the backup location to the internal memory rather than to the SD card (which on the Transformer is just a virtual partition). [DiskUsage](https://play.google.com/store/apps/details?id=com.google.android.diskusage&hl=en) is a nice Android app for analyzing the used space of your memory.

## Up and running ##
After successfully completing the steps before everything should be up and running.

![](/blog/assets/imgs/cm_jellybean_screenshot.png)

So far the increase in speed is impressing, however if I manage I'll write a follow-up post with some more infos after using the ROM for a couple of days/weeks.

[cm_tf101_wiki]: http://wiki.cyanogenmod.org/index.php?title=Install_CM_for_tf101
[cm_unofficial_downs]: http://goo.im/devs/RaymanFX/downloads/CyanogenMod-10
[cm_tf101]: http://get.cm/?device=tf101
[gapps_latest]: http://goo.im/gapps
