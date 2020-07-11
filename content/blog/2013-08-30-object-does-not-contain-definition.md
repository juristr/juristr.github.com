---
title: '''object'' does not contain a definition for ''errors'''
description: ''
show_img_in_detail: false
coverimage: false
category: null
categories:
  - ".Net"
  - CSharp
  - testing
reposts:
  - 'http://dotnet.dzone.com/articles/object-does-not-contain'
date: 2013-08-30T00:00:00.000Z
comments: true
url: /blog/2013/08/object-does-not-contain-definition
type: post
image: /blog/assets/imgs/inspect_dynamic_return_type.png
---


Today I ran into an interesting issues when writing a unit test for an [ExceptionFilter](http://www.asp.net/web-api/overview/web-api-routing-and-actions/exception-handling) which involved inspecting [anonymous return types](/blog/2013/01/aspnet-mvc-action-methods-testing-against-anonymous-return-types/).

I basically had the requirement to return a Json object with a predefined structure (for our ASP.net WebApi endpoints) in case of exceptions resulting out of failed entity validations. So I started to write a unit test in my Api.UnitTests.csproj project which had a reference to Api.csproj where the actual implementation of the exception filter was. Here's the skeleton of the exception filter:

    public class EntityValidationExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {

        }
    }

One of the unit tests looks like this:

    [TestMethod]
    public void ShouldReturnEntityValidationResultsAsAListOfErrorsInJson()
    {
        //arrange
        var httpExecutedContext = CreateHttpActionExecutedContext(new EntityValidationException(
            "Validation of Person failed",
            new List<EntityValidationResult>()
            {
                new EntityValidationResult(new EntityEntry(null, System.Data.EntityState.Modified), new List<ValidationError>() {
                    new ValidationError("Firstname", "Firstname is required"),
                    new ValidationError("Surname", "Surname is required")
                })
            }));
    
        //act
        new EntityValidationExceptionFilter().OnException(httpExecutedContext);
    
        //assert
        var objContent = ((ObjectContent)httpExecutedContext.Response.Content);
        dynamic content = objContent.Value;
    
        Assert.IsNotNull(content.errors);
        Assert.AreEqual(2, content.errors.Count);
    
    }

There's nothing special here, and if you read my post about [ASP.net MVC Action Methods: Testing against anonymous return types](/blog/2013/01/aspnet-mvc-action-methods-testing-against-anonymous-return-types/) then you should also not be surprised about the usage of `dynamic`.

Running the test makes it obviously fail. So let's complete the implementation:

    public class EntityValidationExceptionFilter : ExceptionFilterAttribute
    {

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if(actionExecutedContext.Exception is EntityValidationException)
            {
                //snip snip...some logic

                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse((HttpStatusCode)422, new { errors = validationErrors });
            }
            else
            {
                base.OnException(actionExecutedContext);
            }
        }
    }

Re-executing the test shoukld make it pass now...**no, it doesn't..why??** The exception I get:

    Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: 'object' does not contain a definition for 'errors'
       at CallSite.Target(Closure , CallSite , Object )
       at System.Dynamic.UpdateDelegates.UpdateAndExecute1[T0,TRet](CallSite site, T0 arg0)
       ...

I started to debug the test and inspected it in the Visual Studio debugger, and look there, the expected object shows up just fine, but any execution results in the above mentioned exception..(?!)

<figure class="image--medium">
    <img src="/blog/assets/imgs/inspect_dynamic_return_type.png" />
    <figcaption>Inspecting in the debugger shows the expected object</figcaption>
</figure>

Ahhh wait...I'm returning an **anonymous type** from my exception filter..will that be visible outside my tested DLL "Api", probably not. Adding

    [assembly:InternalsVisibleTo("Api.UnitTests")]

..into the `AssemblyInfo.cs` of Api.csproj and executing the test again proved my assumption: PASS.
