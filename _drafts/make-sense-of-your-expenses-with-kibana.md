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

Often you hear about the **ELK stack**. What is intended is a group of 3 tools are mostly used together:

- Elasticsearch
- Logstash
- Kibana

[Elasticsearch](https://www.elastic.co/products/elasticsearch) is the popular real time search and analytics product that is now part of the renamed [Elastic platform](https://www.elastic.co).

![](/blog/assets/imgs/logo-elasticsearch.png)

Simply take a look at its product page. What you need to know is that it is based upon the popular Apache Lucene platform and thus optimized around full-text search, it is super developer friendly by offering RESTful apis, it is document oriented and schema-free and has some nice features around scalability and high availability.


**Logstash** is a tool for managing events and logs.

<figure>
  <img src="/blog/assets/imgs/logstash.png" height="200px" />
  <caption>&copy; http://logstash.net/</caption>
</figure>

You can think of it as an agent that collects logs from some input like Apache logfiles, rsyslog,..., processes them and sends them to some output, normally Elasticsearch (or some Redis instances if you have to scale out).

**Kibana** is a web based dashboard built to interact with Elasticsearch.

<figure>
  <img src="/blog/assets/imgs/kibana.png"/>
  <caption>&copy; Elastic.co</caption>
</figure>

It allows you to create a number of visualizations based upon your search results and group them together to customized dashboards.

## Installation

This post focuses on Elasticsearch and Kibana, so I'll not go into the details of Logstash. You can download Kibana and Elasticsearch here:
- [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)
- [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana)

Both of them run seamlessly on Windows, Linux and OSX. Just follow the installation instructions. They're quite detailed.

## Extract, process and send data to Elasticsearch

As mentioned in the title, my goal was to make sense of my expenses. Now, my bank only allows to either extract a yearly export in PDF (not quite useful for further processing) and monthly Excel exports. The latter turned out to be what I wanted as they contained quite some useful information like the date of the expenditure, the amount, and a description which even contained the name of the location.

I downloaded the monthly XLS reports and converted them to CSV. Then it was time to take out my Node toolkit.

First of all I required a **CSV parser**. The [node csv package](https://www.npmjs.com/package/csv) seemed to do the job quite well.

```javascript
var stream = require('stream')
    csv = require('csv'),
    moment = require('moment'),
    http = require('http');
```

Require the libs, `stream` for making use of the fantastic [node streams](https://github.com/substack/stream-handbook), `csv` for csv parsing obviously, `moment` for doing some date/time manipulation (you always need that) and finally `http` for sending the data over HTTP to the Elasticsearch REST endpoint.

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
