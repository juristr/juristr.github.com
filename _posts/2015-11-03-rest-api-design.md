---
layout: post
title: "REST Api Design - Resource Modeling"
lead: "A summary from a post on Thoughtworks blog"
category: 
tags: ["Software Architecture"]
---

Important note: **this is not something I've written up by myself**, but it's rather a summary, some highlighting of the most important quotes with some of my comments for an awesome post on the Thoughtworks blog about API design. Their vision quite accurately reflects what I've been doing lately although I did never think about all the concepts in such detail. Moreover I think this could be interesting to you as well. Hence, read on to get more :wink:.  
_(btw, the TL;DR is at the end)_

<div class="alert alert-info">
The original article: <a href="https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling" target="_blank">https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling</a>.
</div>

> The starting point in selection of resources is to analyze your business domain and extract the nouns that are relevant to your business needs. More importantly, focus should be given to the needs of API consumers and how to make the API relevant and useful from the perspective of API consumer interactions.

## Fine grained CRUD resources vs. Coarse Grained resources

Using the example of a blogging platform.

One approach is to design **multiple APIs for each post**: title, textual content, images, tags,... Makes it **very chatty**.  
The alternative would be to have a more coarse grained API, **by identifying "Posts" collection as a resource**. As a result, there's only the need for **one endpoint /posts** which can exhibit POST, PUT, DELETE etc. requests, including title, content, tags, images in the corresponding request body.

Another requirement: ability to "like" a post. Approach one would define a more specific API, like `/posts/{post-id}/likes` while approach two (the coarse grained) would simply include the "liking" action in the single `/posts/{post-id}` endpoint. The problem of the latter: it's more difficult for the consumer as well as the API provider.

> With the single coarse grained “POST” resource approach, to add a comment or to like a blog post, the API provider has to provide an option for the API consumer to indicate that the API request is meant to add a comment or to like a post - may be by specifying a separate XML element or JSON property in the payload that will indicate the payload type. In the server side, API provider has to look for these hints and decide whether the request is to add a comment or to like a post or to actually update the blog post content, etc.

## Preventing migration of business logic to API consumer

> If the API consumers are expected to directly manipulate the low level resources (using fine grained APIs), like CRUD, there will be two big outcomes: Firstly, the API consumer to API provider interactions will be very chatty. Secondly, business logic will start spilling over to the API consumer.

Good point. As they also mention, the API provider has to make sure that API clients **cannot leave the data in an inconsistent state**.

> For example, the blogging application might have a business logic that says that attaching tags on the content is mandatory or that picture tags can be added only when the post has a picture,...

In a "chatty" API scenario the client would have to

1. `POST /posts` to create a new blog post.
1. `POST /posts/{id}/tags` with the proper tag in the request body (or similar)

But what about when the client doesn't do the 2nd call? What about when failures occur between the first and second call?

> In this situation, there should be a very clear agreement on what the API consumer is expected to do? Can the API consumer retry? If not, who will clean up the data?

This is very difficult to handle. Also consumers may be unknown!

> Essentially, the low level CRUD oriented approach puts the business logic in the client code creating tight coupling between the client (API consumer) and services (API) it shouldn't care about, and it loses the user intent by decomposing it in the client. Anytime the business logic changes, all your API consumers have to change the code and redeploy the system. [...]
> 
> In the case of coarse grained APIs, The business logic remains with the API provider side thus reducing the data inconsistency issues discussed earlier.

But keep in mind the negative side effects of a too coarse grained API. There has to be a balance.

> Note: When we talk about preventing business logic migration, we are talking about the control flow business logic (for example, making all the required API requests in correct sequence) and not the functional business logic (for example, tax calculation).

## Coarse grained aggregate resources for business processes

> How can we reconcile coarse grained interfaces that speak the language of a business capability with HTTP verbs against named resources? [...] And how do we avoid the low-level, CRUD-like, nature of service interaction, and speak a language more aligned with business terms? [...]
> 
> Business capabilities / processes can neatly fit the definition of resources. In other words, for complex business processes spanning multiple resources, **we can consider the business process as a resource itself**.

Another important thing...

> It is very important to distinguish between resources in REST API and domain entities in a domain driven design. Domain driven design applies to the implementation side of things (including API implementation) while resources in REST API drive the API design and contract. API resource selection should not depend on the underlying domain implementation details.

## Escaping CRUD

> The way to escape low-level CRUD is to create business operation or business process resources, or what we can call as "intent" resources that express a business/domain level "state of wanting something" or "state of the process towards the end result".

It's not like if you do REST you have a DB as a service (over HTTP). Or at least that shouldn't be the case.

> [...] it's as if you allow random external parties to mess around with your resource state, through PUT and DELETE, as if the service were just a low-level database. [...] The client shouldn't be manipulating internal representation; it should be a source of user intent.

Two ways of doing that. Example of a customer in banking domain that wants to change her address.

  1. `PUT /customers/{id}` or `PUT /addresses/{id}`. With such CRUD like approach, meaningful event data gets lost, such as who changed the address, when etc... Also "the client code needs to have the knowledge of “Customer” domain (including Customer’s attributes, etc.)"
  1. `POST /changeofaddress/{id}`. This resource can contain all the event related data of changing the address, including not only the address data itself, but also who changed it, why etc... that might be relevant to the business process.

> Escaping CRUD means making sure that the service that hosts the resource is the only agent that can directly change its state. This may mean separating resources out into more resources according to who truly owns the particular bit of state. Everyone then just POSTs their 'intents' or publishes the resource states they themselves own, perhaps for polling.

## Nouns vs. Verbs

> Let us consider an example - setting up a new customer in a bank. This business process can be called either EnrollCustomer, or CustomerEnrollment. In this case, the term CustomerEnrollment sounds better because it is noun-ish. It also reads better: “CustomerEnrollment number 2543 for customer xxxx”. It also has the additional benefit of maintaining business relevant, independently query-able and evolving state.

> Thinking about the paper form analogy in a typical business function helps us to focus on the business requirements in a technology agnostic way as discussed by Dan North in his article [“A Classic Introduction to SOA”](http://dannorth.net/classic-soa/).

Example o fa customer enrollment:

> A typical customer enrollment may involve sending a KYC (Know Your Customer) request to an external agency, registering the customer, creating an account, printing debit cards, sending a mail, etc. These steps may be overlapping and the process would be **long-running with several failure points**. This is probably a more concrete example where we **may model the process as a resource**. A process like this will result in creation / updates of multiple low level resources such as Customer, Account, KYCRequest, etc. A GET for such a process will make sense, because we would get back the state of the process currently.

If such process is not modeled as a resource, the API consumer has to know the business logic behind doing such customer enrollment.

<blockquote>
<p>Perhaps this can be a rule of thumb:</p>
<ul>
<li>Does the process need state of its own?</li>
<li>Will the business be asking questions about this process such as - what is the status of the process?</li>
<li>if it failed, why?</li>
<li>Who initiated it and from where?</li>
<li>how many of them happened?</li>
<li>What are the most common reasons for failure of the process, and at which step?</li>
<li>How long did it take on average, min, max?</li>
</ul>
<p>
For most non-trivial processes, businesses want answers to these questions. <strong>And such a process should be modeled as a resource in its own right.</strong>
</p>
</blockquote>

Most important, the noun-based approach may get limiting.

> And this is where the noun-based approach starts getting limiting. Business Processes are of course behavior and the business language often focuses on the verb. But they are also "things" to the business. And given that **we can convert most verbs into nouns**, the distinction starts becoming blurred. And really it’s just how you want to perceive it - any noun can be verbed and vice-versa. The question is what do you want to do with it. You may say things like “enroll Sue” rather than “make an enrollment for Sue”, but when talking about a long-running process it makes sense to say “how is Sue’s enrollment coming along?”. That’s why using a noun for any process that lasts long enough for us to want to know how it’s going looks better.

## Reification of abstract concept

> "Reify": to convert into or regard as a concrete thing. <cite><a href="http://dictionary.reference.com/browse/reification">dictionary.reference.com</a>

The idea is to not focus on the entity itself, but - as previously mentioned - on the intent. 

> A good example of reified resource is CustomerEnrollment that we discussed previously. Instead of using the Customer resource, we are using a resource which is the equivalent of a request to enroll customer.

Examples mentioned:

1. "Cash deposit in bank account: Customer deposits money to his/her account." Create resource "Transaction" or "MoneyDeposit".
1. "Money transfer between two bank accounts: Customer transfers money from one bank account to another bank account." Again, create a resource "Transactin" or "MoneyTransfer".

These examples are excellent. Both of them involve a lot of business rules that have to be taken care of which one obviously wouldn't defer to the consumer.

> This of course doesn't preclude you from having an Account resource as well. [...] Also, there may be genuine use cases for making API requests to “Account” resource. For example, to get the account summary/balance information, the API request should made to “Account” resource.

The take out of this is: Don't have the consumer coordinate, but the API provider (which is somehow obvious I guess).

## REST without PUT and CQRS

> In summary, PUT puts too much internal domain knowledge into the client as discussed earlier. The client shouldn't be manipulating internal representation; it should be a source of user intent. On the other hand, PUT is easier to implement for many simple situations and has good support in libraries. So, the decision needs to be balanced between simplicity of using PUT versus the relevance of event data for the business.

Using POST requests to "nounified" resources also favours CQRS. More here on the Technology Radar: [REST without PUT](https://www.thoughtworks.com/radar/techniques/rest-without-put).

<div class="alert alert-info">
The original article: <a href="https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling" target="_blank">https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling</a>.
</div>

## My conclusion

As the article properly states, it's a matter of trade offs, about whether to use a more fine-grained vs. coarse grained API and vice versa. It very much depends on the context, but the article gives some good insights that might help you to decide.

### TL;DR

- keep balance between coarse grained (only allow `POST /posts` for everything) and finer grained endpoints (multiple requests that have to be done for creating a single "Blog post" entity)
- fine grained: more (control flow) business logic on the consumer; might result in issues with multiple consumers (duplicate logic); inconsistent states
- coarse grained only: business logic on API provider; rigid, hardly reusable, complex to handle on provider as well as consumer side
- escaping CRUD: model business processes as resources themselves: `/moneydeposit`, `/moneytransfer`, `/transaction`
- Consumer shouldn't be manipulating the internal state representation; it should express a user intent
- Nouns vs. verb approach: most verbs can be expressed as nouns, so...