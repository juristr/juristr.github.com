---
title: 'Best practices: Deploying webapps'
date: 2008-09-25T00:00:00.000Z
comments: true
categories:
- ASP.net
- ".Net"
- Software Design
url: /blog/2008/09/best-practices-deploying-webapps
type: post
---

I don't really know whether you want to consider this a "best practices" or not, but I found the title appropriate. So
the thing is how to deploy your webapp. First of all your development environment should consist of three parts:<br />

- **Development environment -** Where developers can hack around, modify data etc...and it won't affect anything, meaning the user won't notice it. Basically where the development takes place.
- **Testing environment -** This may be a place where you run your unit-tests (if you have some and you should have!) or the place where you publish release candidates (new version of the web-app) s.t. your "test users" can try the product and give you immediate feedback.
- **Production environment -** Here everything should work since it is the environment with which the user directly interacts


Of course, every single of the three environments should have its own database (schema) and (in the case of web applications) its own deploying environment (own space on the webserver). The three environments have to be completely isolated; no interaction / dependency between them!!

<figure class="image--small">
  <img src="/blog/assets/imgs/webappPublishContext.jpg" />
</figure>
    
The deployment process should be - if possible - fully automated. If you develop with Java on an Apache or JBoss, you may write a corresponding <a href="http://ant.apache.org/">Ant</a> file for doing that work. Ant files work out great. You can create different build configurations (for the different environments) by "scripting" them using the given Ant syntax. An interesting point (and a best practice) is to include the unit-tests in your build configuration. In this way on every build all the unit-tests are executed and you will just be able to deploy your product if all tests are fine. If you develop in ASP.net, publishing is quite easy. Just right-click on your startup-project and click on "Publish...". Select the right choices and everything should run smoothly.

What I'd like to point out with this post however is to address the problem of the web.config file. If you follow the above mentioned structure of the separated environments, you'll have different connection strings for each DB. Storing the connection string in the web.config file (which is the considered way) means - theoretically - to have also 3 different `web.config` files (due to the connection string inside). Consider the following scenario: You&nbsp;develop locally on your product using a certain connection string to the development database. At a given point you decide to deploy the product on your test environment s.t. your test-users can try and give you a feedback about the implemented features. What you do is to right-click on your startup-project and publish it on the webserver's folder. But attention, what you have to do is to correct the connection string inside your web.config file, because otherwise your test-users will access the development database. So you either have to do that before publishing by temporarily exchanging the connection string or browse after publishing to the webserver's folder etc...Anyway it is really inconvenient and annoying but what may be more delicate is that some developer may accidentally forget to switch the connection strings (imagine that on the production environment!).


<figure class="image--small">
  <img src="/blog/assets/imgs/webConfigDeploy.jpg" />
</figure>
    
So a possible solution is to do not automatically deploy your web.config file. When your application is first published to some environment you copy your web.config file manually and immediately update the connection string s.t. it points to the right environment. On all subsequent deployments, your web.config file won't be touched which avoids to run into troubles. The disadvantage: of course if you modify other parts on your web.config file beside the connection string, you have to manually copy it on the other web.config files on the different environments. But that shouldn't be a big deal.<br />To avoid that you web.config file is automatically copied when you click on "Publish...", you have to open the properties of the web.config file and set the properties `Build Action` to `None` and `Copy to Output Directory` to `Do not copy` (see figure).