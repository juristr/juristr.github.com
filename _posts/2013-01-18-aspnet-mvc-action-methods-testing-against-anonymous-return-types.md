---
layout: post
title: "ASP.net MVC Action Methods: Testing Against Anonymous Return Types"
description: ""
category: 
tags: [Unit Testing, C#]
---
{% include JB/setup %}


I don't use dynamic types regularly, but there are always again situations when they come in quite handy. Here is one example of testing an MVC controller's return value.

You might encounter the situation where you want to test the returned value of an ASP.net MVC controller. For instance you might have the following action method:

    public JsonResult GetById(long id)
    {
        var person = personRepository.GetById(id);
        return Json(person, JsonRequestBehavior.AllowGet);
    }

## Testing an Action Method

Then a corresponding simple test method could might look like this

    [TestMethod]
    public void ShouldReturnAPersonWhenPassingAValidId()
    {
        //Act
        var controllerData = personController.GetById(3);
        var person = controllerData.Data as Person;

        //Assert
        Assert.AreEqual("Juri", person.Firstname);
    }

When invoking the controller's action method you get the returned ActionResult. The actual data of interest is wrapped in its according `Data` property.

## Testing against Anonymous Types

It gets more interesting when you return anonymous types as in this dummy example:

    public JsonResult CalculateValue()
    {
        return Json(new { Sum = 10 }, JsonRequestBehavior.AllowGet);
    }

**How do you verify that the returned object's property `Sum` contains the value 10??** Reflection would be one possibility, but with the **dynamic types** it's even easier.

But caution, because _anonymous types are internal_, you need to add the `InternalsVisibleTo` attribute on the tested assembly, s.t. the test project can access its internal objects. Assume you have a project "AspMvcFrontEnd" and a corresponding test project called "AspMvcFrontEnd.Tests" and that the project name corresponds to the produced assembly name. Then you would have to add the following line **to the assembly you're testing, that is the one hosting the controllers**:

    [InternalsVisibleTo("AspMvcFrontEnd.Tests")]

in the `AssemblyVersion.cs` file of "AspMvcFrontEnd".

The corresonding test can then be written in quite a simple form like this (note the definition of the dynamic type):

    [TestMethod]
    public void ShouldReturnAnAnonymousTypeWithSumEq10()
    {
        //Act
        dynamic obj = controller.CalculateValue().Data;

        //Assert
        Assert.AreEqual(10, obj.Sum, "the sum should be eq to 10");
    }

Quite an elegant approach in contrast to a solution by using reflection.