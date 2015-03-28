---
layout: articles-post
title: "Make sense out of your expenses with ElasticSearch and Kibana"
description: ""
postimg: "/blog/assets/imgs/jenkins-logo.png"
show_img_in_detail: false
category:
tags: ["git"]
---

Do you check your expenses? Do you verify where most of your money is spent? Most of the time I don't, but I'm fascinated by data analytics and visualization. The Elastic platform is predestinated for this.

## Installing Elasticsearch and Kibana

[Elasticsearch](https://www.elastic.co/products/elasticsearch) is the popular real time search and analytics product that is now part of the renamed Elastic platform.

![](/blog/assets/imgs/logo-elasticsearch.png)

Simply take a look at its product page. What you need to know is that it is based upon the popular Apache Lucene platform and thus optimized around full-text search, it is super developer friendly by offering RESTful apis, it is document oriented and schema-free and has some nice features around scalability and high availability.

**Kibana** on the other side is the open source, web based dashboard built to interact with Elasticsearch.

![](/blog/assets/imgs/kibana.png)

It allows you to create a number of visualizations based upon your search results and group them together to customized dashboards.

Download both of them here and follow the installation instructions:

- [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)
- [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana)

Both of them run seamlessly on Windows, Linux and OSX.

## Send data to ElasticSearch



...

## Data, where to get it from

...

## Node to the help...

- streams
  - https://github.com/substack/stream-handbook
  - http://nicolashery.com/parse-data-files-using-nodejs-streams/
- parsing data
  - https://www.npmjs.com/package/xls-to-json
  - http://stackoverflow.com/questions/15936616/import-index-a-json-file-into-elasticsearch
- Regex: http://scriptular.com/

## Future work

- https://github.com/nchaulet/node-geocoder
- http://www.elastic.co/guide/en/elasticsearch/reference/1.3/mapping-geo-point-type.html
