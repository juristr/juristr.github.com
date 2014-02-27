---
layout: articles-post
title: "Jenkins - Notifications"
headline: "Enabling Jenkins Notifications"
subtitle: "Get notified in various ways"
description: "Article about getting the most out of Jenkins notifications, like rich build reports etc."
postimg: "/blog/assets/imgs/jenkins-mail-templates/build-html-result.png"
show_img_in_detail: true
category: article
tags: [Jenkins]
---

## Create a template

Beside sending in plain text or html there are different options of customizing Jenkins email templates:

- Email tokens ([Token Macro Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Token+Macro+Plugin))
- Jelly content (using Jelly scripts to interact with the Jenkins API)
- Script content (using Groovy or JavaScript to query the Jenkins API)

There are some examples available, for instance take the following [Groovy HTML template](https://github.com/jenkinsci/email-ext-plugin/blob/master/src/main/resources/hudson/plugins/emailext/templates/groovy-html.template). The easiest way is to take them as a starting point and then extend it to your needs.

### Deploy the template on JENKINS_HOME

In order to be able to use a given template, you have to deploy it on your Jenkins server, which is nothing more than copying it into `$JENKINS_HOME/email_templates`.

You can obviously specify as meany templates as you want.

## Configure Editable Email Notification plugin

In order to instruct Jenkins to use the previously created template you have to reference it from your build job configuration by adding an **Editable Email Notification** in the **Post-build Actions**.

> Note that you have to install the [Mail-Ext plugin](https://wiki.jenkins-ci.org/display/JENKINS/Email-ext+plugin) on Jenkins.

![](/blog/assets/imgs/jenkins-mail-templates/editable-build-notification.png)

## Conclusion

As a result, depending on your template customization you get a more simple build report

![](/blog/assets/imgs/jenkins-mail-templates/build-html-result.png)

..or an advanced one, also showing you JUnit test results and in case of a failure an excerpt of the Jenkins console output.

<figure>
  <img src="/blog/assets/imgs/jenkins-mail-templates/build-html-sophisticated.png" />
  <figcaption>More sophisticated template showing result of unit tests</figcaption>
</figure>

