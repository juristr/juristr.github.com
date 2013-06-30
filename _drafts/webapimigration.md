---
layout: post
title: "Asp.net WebApi Migration"
description: ""
category: bliki
tags: []
---

## Getting Started
To start using the new WebApi you need to just normally create a Visual Studio project. Then add a new project and choose "ASP.net MVC4" as the project type.

![](/blog/assets/imgs/webapisetup_1.png)

Subsequent to that selection a dialog should appear having a project template called "WebApi". You should choose that.

![](/blog/assets/imgs/webapisetup_2.png)

### File organization
One of the immediate things I'm going to look at when getting started with a new project is the `Global.asax.cs` file. And look there, compared to the ASP.net MVC3 project template it looks rather clean:

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }

The different configurations are separated based on their responsibility into different files, located in the `App_Start` folder. Otherwise the template didn't change that much. We still have the `Controllers`, `Models` and `Views` folder which belong to the MVC kind of setup.

## Routing, Controllers and Actions
What's more interesting probably when focusing on the WebApi are the anatomy of the controllers itself and how the routing has to be configured in order to select the correct action on the correct controller. 

In the code sample of the Global.asax.cs file we've seen two lines which could potentially be interested in the context of routing and WebApi setup:

- `RouteConfig.RegisterRoutes(RouteTable.Routes);`
- `WebApiConfig.Register(GlobalConfiguration.Configuration);`

Both files are located (as mentioned) in the App_Start folder of the project. When opening `RouteConfig.cs` we find the following default setup:

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }

`WebApiConfig.cs` on the other hand has this setup:

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            config.EnableSystemDiagnosticsTracing();
        }
    }

As can be seen, both of them deal with routing, but while the first one is intended for the classic MVC4 setup with server-side views, the latter one is exclusively for establishing the WebApi routing. Note also the different routing template `api/{controller}/{id}`.

### ApiController
The major difference between a controller from the WebApi to that of a classic ASP.net MVC controller is that it inherits from `ApiController` rather than `Controller`. The difference?? ApiController has only a bunch of methods:

    public HttpConfiguration Configuration { get; set; }
    public HttpControllerContext ControllerContext { get; set; }
    public ModelStateDictionary ModelState { get; }
    public HttpRequestMessage Request { get; set; }
    public UrlHelper Url { get; set; }
    public IPrincipal User { get; }

    public void Dispose();
    protected virtual void Dispose(bool disposing);
    public virtual Task<HttpResponseMessage> ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken);
    protected virtual void Initialize(HttpControllerContext controllerContext);

...while the Controller has dozens (copying them here is not possible). What might be interesting is that they have different hierarchies. While the ApiController implements `IHttpController`, the classic Controller inherits from `ControllerBase` which in turn implements `IController`. Moreover it also implements a couple of other interface, where the most interesting are probably `IActionFilter`, `IAuthorizationFilter`, `IExceptionFilter`, `IResultFilter`, and `IAsyncController`.

### Action Selection
Formerly I was using ASP.net MVC3 for realizing a REST-like backend interface. The routings I supported were:

- `GET /{controller}` - for retrieving all elements; optionally it was possible to provide url params for filtering like `?firstname=someName&age=23` and so on.
- `GET /{controller}/{id}` - for retrieving one single entity identified by the passed `{id}`.
- `POST /{controller}` - for persisting a _new_ object.
- `PUT /{controller}/{id}` - for updating an existing object (identified by the passed `{id}`.
- `DELETE /{controller}/{id}` - for deleting an existing object (identified by the passed `{id}`.

While for realizing such routing in ASP.net MVC3 controllers it was necessary to add further route configurations to the default one. When using the WebApi controllers, the default configuration should work just fine. Ideally a possible controller implementing a REST api for an entity `Person` would look as follows:

    public class PersonController : ApiController
    {

        // GET /api/person
        public IEnumerable<Person> GetAll()
        {
            //TODO: contact the BL layer for retrieving the data
            return retrievedPeople; //which is of type IEnumerable<Person>
        }

        // GET /api/person/4
        public Person GetById(int id)
        {
            //TODO: contact the BL layer for retrieving the data
            return thePerson;
        }

        // 
        public Person SavePerson(Person person)
        {

        }

    }

## Authorization

## Json Serialization

## Exception Handling

### Custom Exceptions

## Caching

---

**References**

- [Routing in ASP.net WebApi](http://www.asp.net/web-api/overview/web-api-routing-and-actions/routing-in-aspnet-web-api)
- [Routing and Action Selection](http://www.asp.net/web-api/overview/web-api-routing-and-actions/routing-and-action-selection)
- [StackOverflow: Single controller with multiple GET methods in ASP.net Web Api](http://stackoverflow.com/questions/9499794/single-controller-with-multiple-get-methods-in-asp-net-web-api)
- [StackOverflow: Multiple HTTP Post Method in MVC4 WebApi Controller](http://stackoverflow.com/questions/11407267/multiple-httppost-method-in-mvc4-web-api-controller)