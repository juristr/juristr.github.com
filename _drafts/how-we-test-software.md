---
layout: articles-post
title: "How we test software"
lead: "The devil is in the detail...or in the attribute's casing"
show_img_in_detail: false
coverimage: false
category:
tags: ["automated testing"]
---


## Intro and Overview

- testing pyramid

## Unit testing



## Integration testing

- directly by calling the REST api controller classes / Resources in Java

## Performance testing

- jMeter (customized script reading from CSV file)
- also kind of integration test as it functions as client for the REST endpoints
- but very rough tests..just verify it returns JSON and HTTP/200
- normally just GET requests but could be easily extended with POST/PUT/... etc

## UI testing

- NightwatchJS scripts
- only a few interactions
- don't go too deep...hard to maintain, costly tests

## Jenkins integration

- all kind of tests **must** be executed on automated pipeline
- (useless otherwise)

## Issues

- watch out for the cost of tests
- minimize overlappings UI <> perf <> integration tests <> unit tests
