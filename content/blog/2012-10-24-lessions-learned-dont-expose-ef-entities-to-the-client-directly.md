---
title: 'Lessons Learned: Don''t Expose EF Entities to the Client Directly'
description: ''
category: null
categories:
  - Software Design
  - 'C#'
  - ".Net"
  - ASP.net MVC
reposts:
  - 'http://dotnet.dzone.com/articles/lessions-learned-dont-expose'
date: 2012-10-24T00:00:00.000Z
comments: true
url: /blog/2012/10/lessions-learned-dont-expose-ef-entities-to-the-client-directly
type: post
---


When we refactored our main application architecture, moving from an ASP.net WebForms app to a rich client JavaScript application with an ASP.net MVC REST backend, one of our main goals was to keep things as simple as possible.

We introduced the [Repositories](http://martinfowler.com/eaaCatalog/repository.html) for having more control about the usage of the EF DbContext and for giving the DAL a base structure upon which the application can be constructed. To what regards the ASP.net MVC backend we slightly adjusted its default routes to match a more REST like experience such as:

- GET `/entity?filterparams` _for retrieving a list of entities_
- GET `/entity/id` _for retrieving a specific entity identified by its id_
- POST `/entity` _for creating a new one_
- PUT `/entity/id` _for upddating an existing entity_
- DELETE `/entity/id` _for deleting an existing entity_

As a result, often in our MVC controllers there is code like

    public JsonResult Details(long id)
    {
        //returns the person with the given id
        return Json(personRepository.GetById(id));
    }

So far so good, `Json(...)` is overwritten to use the [JSON.net](http://nuget.org/packages/Newtonsoft.Json) serializer as it performs better than the native one and has nice features like converting names from Pascal-casing to Camel-casing (which usually works better in the JavaScript world).

## Issues? ##
Looking at this, you might not identify any problem at all, right? Well, the issue I found by using such approach in one of our first applications is the fact that the **EF entity is directly serialized to the client**.

Here just some of the points I identified that are potentially making this an issue.

### Size ###
The first problem is **the size**. EF entities normally have relations and most often even bidirectional relations. For instance:

    class Person
        string Firstname
        string Surname
        Address address
            City city
                string Name
                string ZipCode
                List<Address> Addresses
            string Street
            List<Person> People

You see the recursion?? `people` has a list where the initial person instance will be present. Same concept with `City` and `addresses`. When serializing this to the client we get the whole recursion serialized down to a certail level (as JSON.net has cycle detection).

For a single entity that might work, but think of the situation when you're going to load a list of entities (in the scenario of a person search or similar). That's useless data transfer.

### Dependencies towards the Client Implementation ###
When you create a plain normal web application, you have some kind of view HTML rendering engine to which you pass the data and which then renders the resulting HTML to the client. On the other side, when you create a rich-client JavaScript application with a backend exposing JSON, the thing becomes different. You actually **create an API**! Although it might just be intended for "intra-application" usage, an API creates a contract which you shouldn't/cannot break easily. If today you expose a whole object graph, you cannot remove part of it tomorrow. Another dev might have created his part of the app relying on exactly the structure you provided.

### Complexity ###
The EF entities may not naturally match the UI you're going to create. Especially if you're using a data-driven approach (rather than model first), the resulting EF entities and the according relations are usually closer to the underlying DB model. Consequently, by using the EF entities you often run into more complex UI bindings as if you'd have exposed the structure already in a form that is required by the client.

### Maintainability
Generally speaking, maintainability might become an issue as well. If you expose EF entities directly to the client and you're going to edit your EF model (down in the DAL layer), changing a single property name might potentially have an impact on the correct functioning of the client. That sounds wrong, doesn't it?

## Solutions? ##
So far I just pointed out some potential issues. But how can we solve them effectively.

### Developer Consciousness ###
Ok, might be an option in small apps, but usually isn't really once it gets more complex. By developer consciousness I basically just mean that the dev itself takes care about what he's going to expose by either using ad-hoc _anonymouse C# objects_ for the JSON serialization like

    public JsonResult SomeAction() {
        //...
        return Json(new {
                firstname = aPerson.Firstname,
                residenceStreet = aPerson.Residence.Street
            });
    }

or alternatively to directly control the serialized properties on the existing entity. Json.NET provides a nice attribute for this: `[JsonIgnore]`.

### DTOs ###
[Data Transfer Objects](http://martinfowler.com/eaaCatalog/dataTransferObject.html), as described in Fowler's book about Patterns of Enterprise Application Architecture:

> An object that carries data between processes in order to reduce the number of method calls.

The DTO lets you control in a very efficient way what you're going to serialize to the client. Take the object graph I discussed at the beginning of the post. An according DTO might look as follows

    class PersonDto
        string Firstname
        string Lastname
        string AddressCityName
        string AddressCityStreet

Note the projection of the relation properties to a single level. This drastically reduces the nesting and according data amount that needs to be transferred. Moreover it becomes much easier to bind such model to HTML elements.

## Conclusion ##
I guess _in the long run_ DTOs are probably the only efficient way on how to properly expose data via REST like services to a JavaScript client. They are obviously an overhead in that you need to create additional entities and the data needs to be mapped, but it pays off in the resulting simpler and more maintainable APIs.

Note that in .Net there exists [AutoMapper](https://github.com/AutoMapper/AutoMapper) which drammatically reduces the mapping overhead. If ever you should have the need to map between two different kind of object structures, give it a try before crafting your own assembler. If I manage to, I'm posting a follow-up article on how to use AutoMapper in supporting the creation of DTOs for REST services with ASP.net MVC.
