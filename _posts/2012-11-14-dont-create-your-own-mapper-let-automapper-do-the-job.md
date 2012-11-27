---
layout: post
title: "Don't Create Your Own Mapper, Let AutoMapper Do The Job!"
description: ""
category: 
tags: [C#]
---
{% include JB/setup %}

Mapping is a common task when integrating different systems with each other. Although it might often seem an unnecessary overhead, it's highly suggested (even when you communicate within your own systems) as you don't want to depend on the internal structure of another service. I'm talking about DTOs basically. But please, don't create your own mapper, there are tools out there which solve this task probably better than you might.

I've implemented my custom mappers as well. When you do so I highly suggest you to write some automated tests! They'll save your life the next time your object structure changes. But at the same time such tests are **extremely tedious** to write and moreover they are **short-lived**. Why? Because they often look like

    [TestMethod]
    public void ShouldCorrectlyMapAPersonInstance(){
        var originalPerson = new Person(){
            Firstname = "Juri",
            Surname = "Strumpflohner",
            Age = 27
        };

        var targetPerson = MyDtoMapper.MapPerson<AnotherPersonObject>(originalPerson);

        Assert.AreEqual(originalPerson.Firstname, targetPerson.Firstname);
        Assert.AreEqual(originalPerson.Surname, targetPerson.Surname);
        ...
    }

You have to compare property by property. Now this is a simple and plain object structure, but I guess you can easily imagine how quickly this mapping becomes more complex once you have nested subobjects and lists with different structures. I can assure you'll have to write dozens of tests just to cover the different edge cases. The **short-lived** nature of such tests comes from the simple fact that they are tightly coupled to the underlying object structure and that's actually correct as they *test it*.

## Let AutoMapper Do The Job For You

.Net has an extremely powerful open source mapper library called [AutoMapper](https://github.com/AutoMapper/AutoMapper) which will extremely ease your life when it comes to mapping. On GitHub they also have quite some [good documentation where you can get started](https://github.com/AutoMapper/AutoMapper/wiki).

### Installation
Using NuGet installation is as easy as opening your Package Manager Console and typing

    Install-Package AutoMapper

### Mapping Configuration

AutoMapper is based on defining so-called **mapping configurations** between the different objects. Consider you have the following two objects (in pseudo-code)

    class Person
        string Firstname
        string Surname
        int Age
        Address[] Addresses

and a target class you'd like to map to

    class Parent
        string Firstname
        string Surname
        int Age
        Location[] Addresses

Assuming the `Location` and `Address` objects have the same internal structure, you'd have to create an AutoMapper configuration that looks like the following

    Mapper.CreateMap<Person, Parent>();
    Mapper.CreateMap<Address, Location>();

Since all the property names match, **AutoMapper would automatically copy them over** and even traverse the lists.

In case you have to map non-matching property names, you can configure the mapping like

    Mapper.CreateMap<Person, Parent>()
        .ForMember(x => x.DifferentNamedProperty, opt => opt.MapFrom(src => src.OriginalPropertyName));

That's it. There are a lot of configurations and options available like

- Projection
- Flattening
- Custom Converters/Resolvers/Formatters
- Inheritance Mapping

and much more. So go and [check out the docs](https://github.com/AutoMapper/AutoMapper/wiki).

### The Mapping

I usually create a static class `DtoMapper` which has an `Init()` where all the configuration lies. In the class constructor where I need the mapping I then call that init

    DtoMapper.Init();

and then in the specific method where the mapping has to take place, I execute it like

    var targetParentObj = Mapper.Map<Person, Parent>(thePersonObj);

### Testing
What about testing these mappings? That's as easy as

    [TestMethod]
    public void TheMappingConfigurationShouldBeValid()
    {
        DtoMapper.Init();
        Mapper.AssertConfigurationIsValid();
    }

The `AssertConfigurationIsValid()` will throw a nice, expressive exception in case it fails. Note that in the configuration mapping you also have to specify eventual **properties you don't like to be mapped**:

    Mapper.CreateMap<Person, Parent>()
        .ForMember(x => x.IgnoreProperty, opt => opt.Ignore());

## ASP.net MVC DTOs
Whether you apply the MVVM pattern or you create a REST-like API for JavaScript clients. One of my lessions learned is for sure to [not expose the Entity Framework entities directly](/blog/2012/10/lessions-learned-dont-expose-ef-entities-to-the-client-directly/). Instead it is preferrable to create specific DTOs (or you could call them ViewModels as well) where you create highly specialized entities just of the purpose you need. 

A useful feature in such case is AutoMapper's [Flattening](https://github.com/AutoMapper/AutoMapper/wiki/Flattening). Basically instead of rendering an object graph you often prefer to transfer a flat object to your client as it is easier to bind on the UI. So if you have an `Order` with a nested `Customer` object like

    class Order
        int Id
        Customer TheCustomer
            string Name

and you'd like to display the order information together with the customer's name on your UI then you can create a DTO

    class OrderDto
        int Id
        string TheCustomerName

and a mapping configuration

    Mapper.CreateMap<Order, OrderDto>();

The interesting property here is the `TheCustomerName` property in the `OrderDto`. AutoMapper basically fills it following the source object's relation `TheCustomer` and taking the corresponding `Name` property. Extremley elegant!

## In Java?
Its quite some time since I last actively developed in Java, but apparently there is a new tool called ModelMapper which does quite a similar job as AutoMapper. You may want to check it out here: [http://modelmapper.org/](http://modelmapper.org/).

## Conclusion
Don't reinvent the wheel! Go and check it out.