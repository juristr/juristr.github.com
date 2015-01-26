---
layout: articles-post
title: "Java CDI Dependency Injection"
description: ""
postimg: "/blog/assets/imgs/jenkins-logo.png"
show_img_in_detail: true
category: 
tags: ["Java"]
---

## Inject all implementations of a specific interface

Consider I have different Maven modules and I'd like to retrieve the according version for all of them. What I'd like to avoid is to hard-reference each module and explicitly call some method.


public class VersionCollector {
    
    @Inject @Any
    private Instance<IModuleMetaInfo> moduleMetaInfos;

    public void printVersions(){
        
    }

}