---
layout: link
type: link
title: "On Monoliths and Microservices"
link: http://dev.otto.de/2015/09/30/on-monoliths-and-microservices/
tags: [Architecture]
---
- Have cross-functional teams
- vertical decomposition: create vertical slices, being as independent from each other as possible (self-contained systems)
- vertical services may be even large -> split internally
- services don't have a common DB as that would create a tight coupling between them
- good experiences with "Fat JARs" which can be executed via `java -jar <file>` (starting an embedded Jetty or something..)
- REST and Microservices work well together
- Micro-architecture which deals with the inner workings of a services and is left to the team; macro-architecture is about the interactions between the services
- crucial points:
  - vertical decomposition
  - RESTful architecture: communication exclusively over REST
  - Shared nothing architecture: no shared state, no HTTP sessions, no central data storage, no shared code. Multiple instance of the same service share the same DB.
  - Data governance: There's a single "truth", others have access to the data provider via a REST Api and can eventually copy data to their own storage.
- Integration over hyperlinks
- Data replication: services poll atom feeds of the responsible vertical product to regularly get data updates and keep in their own storage (they're not using data queues)
  - temporary inconsistencies at the cost of availability of services
  - could be avoided to replicate by calling remote services directly -> problem of delays and slowdowns of the entire system though