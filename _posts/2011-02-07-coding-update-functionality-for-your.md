---
layout: post
title: "Coding an Update Functionality for your Android App"
date: 2011-02-07
comments: true
tags: [  Java, mobile dev, Android ]
---
An immediate answer would be: why should I need that. I publish my app on the market which has a build-in update functionality. Totally true :). The need for such a functionality arose when I wrote the Android app for my current MSc thesis research. The application was never intended to be published on the market, but rather it was just thought for internal use. However, providing some kind of intuitive update mechanism is crucial for being able to release bugfix upgrades or add new features. The same may hold for you as well, for instance in the case where you develop an app for a company which doesn't want it to be released on the official Android market. Or you want to implement different "channels" (as Chrome does it), marking an app as an early release version which will be updated through your own mechanism to a dedicated set of beta testers.

## Android App Versioning
Android applications have two different kind of version numbers: the version code and version name. The version code (see line 4 below) versiones the codebase while the version name (see line 5) is intended for visualization purposes, i.e. for showing in your application's about UI or it is displayed by Android on its Manage Applications user interface.  

<pre class="brush:xml">&lt;?xml version="1.0" encoding="utf-8"?&gt;<br />&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"<br />   package="com.yourcompany.yourapp" <br />   android:versionCode="109"<br />   android:versionName="0.1.6.109 dev"&gt;<br />   ...<br />&lt;/manifest&gt;<br /></pre>

Clearly the main interest is for the version code as it can be easily used to compare for the availability of a newer version, i.e. a higher version code number than the current one.

## Programmatically Reading the Version Code

The first step is to be able to programmatically read the current application's version code. As it turns out, that is pretty easy:

<pre class="brush:java">public static int getVersionCode(Context context) {<br />   PackageManager pm = context.getPackageManager();<br />   try {<br />      PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);<br />      return pi.versionCode;<br />   } catch (NameNotFoundException ex) {}<br />   return 0;<br />}</pre>Just for the sake of completeness, the version name can be retrieved similarly:<br /><pre class="brush:java">public static int getVersionCode(Context context) {<br />   PackageManager pm = context.getPackageManager();<br />   try {<br />      PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);<br />      return pi.versionName;<br />   } catch (NameNotFoundException ex) {}<br />   return 0;<br />}</pre>

Now, knowing how to read the current version code it is just necessary to query some remote location for the presence of an application with a higher version code as the current one.

## The Update Strategy

I took a very simple, yet efficient approach. On some remote, publicly accessible location on the web, new versions get deployed. Basically the new apk file as well as a plain normal text file containing nothing but that application's version code. So I have

- The APK: http://some-public-url/deploy/MyApplication.apk
- The version info file: http://some-public-url/deploy/versioninfo.txt

On the mobile client app, I have an updater service which runs as an <a href="http://developer.android.com/reference/android/app/Service.html">Android Background Service</a>. The logic is simple: in regular intervals, the service downloads the `versioninfo.txt` file and parses the containing number representing the version code of the deployed application. The download is done by opening an HTTP connection and issuing a GET request:

<pre class="brush:java">private String downloadText() {<br />   int BUFFER_SIZE = 2000;<br />   InputStream in = null;<br />   try {<br />      in = openHttpConnection();<br />   } catch (IOException e1) {<br />      return "";<br />   }<br /><br />   String str = "";<br />   if (in != null) {<br />      InputStreamReader isr = new InputStreamReader(in);<br />      int charRead;<br />      char[] inputBuffer = new char[BUFFER_SIZE];<br />      try {<br />         while ((charRead = isr.read(inputBuffer)) &gt; 0) {<br />            // ---convert the chars to a String---<br />            String readString = String.copyValueOf(inputBuffer, 0, charRead);<br />            str += readString;<br />            inputBuffer = new char[BUFFER_SIZE];<br />         }<br />         in.close();<br />      } catch (IOException e) {<br />         return "";<br />      }<br />   }<br />   return str;<br />}</pre>

The `openHttpConnection()` method that gets called from within `downloadText()` contains the code for - obviously - opening the HttpConnection which is returned as an `InputStream` to the caller for being further processed:

    private InputStream openHttpConnection() throws IOException {
        InputStream in = null;
        int response = -1;

        URL url = new URL(getVersionFile());
        URLConnection conn = url.openConnection();

        if (!(conn instanceof HttpURLConnection))
            throw new IOException("Not an HTTP connection");

        try {
            HttpURLConnection httpConn = (HttpURLConnection) conn;
            httpConn.setAllowUserInteraction(false);
            httpConn.setInstanceFollowRedirects(true);
            httpConn.setRequestMethod("GET");
            httpConn.connect();

            response = httpConn.getResponseCode();
            if (response == HttpURLConnection.HTTP_OK) {
                in = httpConn.getInputStream();
            }
        } catch (Exception ex) {
            throw new IOException("Error connecting");
        }
        return in;
    }

As you can see there is space for improvements. The `downloadText()` as specified above downloads a `String` value which needs to be converted to an integer for doing a proper comparison with the device's current version.  
The **check itself is quite simple**: if the downloaded number is bigger than the current app's version code number, a notification is triggered to the user, indicating the presence of a newer version. By clicking on the notification, a download <a href="http://developer.android.com/reference/android/content/Intent.html">Intent</a> is fired, which downloads the new apk file by using the browser's build-in download functionality:

<pre class="brush:java">Intent updateIntent = new Intent(Intent.ACTION_VIEW,<br />       Uri.parse("http://some-public-url/deploy/MyApplication.apk"));<br />startActivity(updateIntent);</pre>

This is for sure the simplest approach. A more sophisticated one could be to let the application itself download the new apk to the SD card and fire the install, afterwards removing the APK again etc...

## Hosting the new Versions
Well, the two files can be hosted on any system which is accessible through a public URL. Maybe you have an application's website for instance. Personally I've chosen <a href="https://www.getdropbox.com/referrals/NTEwOTM2OQ">Dropbox</a>. It gives you the ability to have public folders which dispose of a URL that can be shared with others. Deploying a new version is then just as easy as copying two files to your Dropbox folder on your computer, that's it :).<br /><br /><i>(If you don't have Dropbox you can get an invitation with 250MB additional storage space <a href="https://www.getdropbox.com/referrals/NTEwOTM2OQ">here</a>)</i>