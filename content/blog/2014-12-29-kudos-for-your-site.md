---
title: Kudos for your site - powered by Firebase
lead: Learn how to add your own kudos to your blog or website
show_img_in_detail: true
coverimage: true
category: null
categories:
  - JavaScript
  - The Desk
date: 2014-12-29T01:00:00.000Z
comments: true
url: /blog/2014/12/kudos-for-your-site
type: post
image: /blog/assets/imgs/firebase-cover.png
---

I don't quite remember, guess it was about more than a year ago when I came across a Svbtle-hosted blog where I noticed a small little circle, bouncing when you hover it and showing a number followed by "Kudos". What are Kudos? Read ahead and see how I created my own version using Firebase as the backend storage.

> **Note**, if you're here because you simply want to use the Kudos script on your own site, jump to the section about "Code and Usage". Otherwise read ahead.

So, **what are Kudos**? Wikipedia explains them as follows:

> Kudos (from the Ancient Greek: κῦδος) is acclaim or praise for exceptional achievement. <cite><a href="http://en.wikipedia.org/wiki/Kudos">Wikipedia</a></cite>

If I'm right, then [Dustin Curtis](http://dustincurtis.com/) came up with this idea when creating the famous blogging platform [Svbtle](https://svbtle.com/). Go there to see some examples.  
It's basically similar to a Facebook "like" or Google+ "+1" button. I first saw them on the famous [Svbtle](https://svbtle.com/) blog engine. I liked it, so I decided to roll my own.

After some googling I found [Amit Upadhyay's](http://amitu.com/2013/04/kudos-using-parse-for-jekyll/) post. He already had a similar idea to create a Svbtle independent Kudo implementation by using [Parse](https://parse.com/) as the backend service.


## Firebase as the backend DB

Modern JavaScript tools and libraries give you plenty of possibilities to create rich user interfaces in a fairly fast and easy way. However, **once you need some backend service for persistent storage, things get complex**. Don't get me wrong, I love to code on the server and I regularly do it. But when I want to create some quick tool, some nice app, then the frontend is setup quite quickly. All you need is some JavaScript knowledge, a code/text editor and a browser. When it comes to the backend you...

- have to decide which language/server: Node, .Net, Java, Ruby...
- how to handle authentication: OAuth? Facebook, Twitter, Google,...
- which database? relational, non-releational? MongoDb, PostgreSQL
- hosting? some cloud service, self-hosted? a VPS?
- ...

Lots of decisions you don't really want to face for a simple webapp like this kudo script here. Still, I obviously required some kind of backend for storing the kudos and even some minimal security policies to prevent - for instance - multiple kudos from a single person.

**Firebase** is great here. It presents itself as the "Realtime App Platform":

> Store & Sync Data Instantly: Build realtime mobile and web apps in minutes using client-side code and our powerful API. Save time. Delight your users.

And that's totally true. Not only do you get an easy way to store your data, but you can even implement real-time synchronization among your clients. That has never been so easy.

Besides that, Firebase has lots of little integration libraries for the web (like Angular or Ember plugins), for mobile apps and even for server-side code like Node.js.

![](/blog/assets/imgs/firebase-frameworks.png)

## How do I use Firebase

So how does this work on the Kudo script? I'll only show some quick snippets as the official Firebase documentation is very clear and detailed.

First of all you obviously need to integrate with Firebase. This is as easy as to include the JavaScript library:

```html
<script type='text/javascript' src='https://cdn.firebase.com/js/client/1.1.2/firebase.js'></script>
```

In your code you then get a reference to the `Firebase` object, specifying the node you'd like to reference.

> **Note**, a Firebase storage can be imagined like a big JSON object within which you navigate around and organize your data. More on the [docs](https://www.firebase.com/docs/web/guide/understanding-data.html).

```javascript
var firebase = new Firebase('https://firekudos.firebaseio.com/');
```

Imagining you have a structure like

```json
{
    "kudos": [
        ...
    ]
}
```

..then you can navigate to the child nodes by either instantiating a new `Firebase` object with the new path `new Firebase('https://firekudos.firebaseio.com/kudos)` or by using an existing instance:

```javascript
var kudosChildNode = firebase.child('kudos');
```


### Authentication and authorization

Before continuing I have to explain another core feature of Firebase: **user authentication & authorization**. JavaScript code cannot be trusted as it runs on the user's machine. As such, when you directly access a database as a service you have to impose some security rules in order to make sure a user is only able to manipulate its own data. Firebase has **build-in user authentication and authorization**. There are adapters for the major OAuth providers like Twitter, Facebook, GitHub and Google. Moreover there's the possibility to do username/pwd authentication, through email or even by providing a custom login token generator. Just [check out the docs](https://www.firebase.com/docs/web/guide/user-auth.html).  
Doing such authentication just for the purpose of providing a Kudo would be a total overhead. Lucky me, Firebase also provides **anonymous authentication**.

> Each time you login a user anonymously, a new, unique user ID will be generated, and your Firebase reference will be authenticated using these new credentials. The session will live until its configured expiration time...

Anonymous login is done like

```javascript
firebase.authAnonymously(function(err, authenticationData) {
    ...
});
```

`authenticationData` is an object [containing a series of properties](https://www.firebase.com/docs/web/api/firebase/getauth.html). One of them is the `uid` which uniquely identifies the authenticated user. By invoking `firebase.getAuth()` the current authentication object is returned, or `null` if the user is not yet logged in. `firebase` is the reference to the backend database (see code above).

Within the Kudos script I use the following function for handling the authentication:

```javascript
var getAuthData = function(){
    var deferred = $.Deferred();

    var authData = firebase.getAuth();
    if(authData == null){
        // authenticate the user
        firebase.authAnonymously(function(err, authenticationData) {
            //authData = authenticationData
            deferred.resolve(authenticationData);
        });
    }else{
        deferred.resolve(authData);
    }

    return deferred.promise();
};
```

The function returns a promise which either resolves with the authData when the user has already been authenticated or executes the anonymous login.

I then use the `uid` from the authData to identify a user's Kudo entry. This is how the data for a given page looks like:

![](/blog/assets/imgs/firebase-data-entry-structure.png)

This allows me to restrict the user in such a way that it can only add new kudos or remove its own entry. This is enforced by the **Firebase security rules** which can be configured on its website. The rule for the kudo DB looks as follows:

![](/blog/assets/imgs/firebase-kudo-rules.png)

Again, check the docs for the exact syntax. What the above definition does is to allow all users to read all likes, but only modify (write) those created by themselves.

## Storing and retrieving data

Storing data is as simple as selecting some node and setting the value.

```javascript
someChildNode.set({
    count: 1
});
```

Specifically, in the Kudo script it looks like this:

```javascript
getAuthData().then(function(authData){
    firebaseKudos
        .child(key)
        .child('likes')
        .child(authData.uid)
        .set({
            count: 1
        });
});
```

`key` is the page url (cleaned from special symbols like slashes etc). Then I create/or update a subnode "likes" before creating an entry for the current user, with its authentication UID.

**Removing** an existing Kudo simply removes the according node:

```javascript
getAuthData().then(function(authData){
    firebaseKudos
        .child(key)
        .child('likes')
        .child(authData.uid)
        .remove();
});
```

**Retrieving** the data enables at the same time also real-time updates.

```javascript
firebaseKudos.child(key).on('value', function(snapshot){
    if(snapshot){
        var article = snapshot.val();
        var likeCount = 0;
        if(article){
            for(var prop in article.likes){
                likeCount++;
            }
        }
        ...
    }
});
```

Every time a value is updated on the Firebase store, this callback will be invoked.

## Code and Usage

All of the code is available on **GitHub**: [https://github.com/juristr/kudos](https://github.com/juristr/kudos).

There are even detailed instructions on how to add the script to your own page as well as on how to properly create and configure your Firebase account. As always, I'm more than happy for any comments or PRs with improvements.

## Conclusion

Firebase is great as a backend for simple applications. Especially when it comes to real-time synchronization between different clients which you literally get for free. Another area where I could imagine to use it is on mobile devices. The vast amount of available client libraries makes it really easy to connect to Firebase. So you could have it as your integration backend with a larger environment or ecosystem of applications, just to be aligned with the latest movements Microservices ;).
