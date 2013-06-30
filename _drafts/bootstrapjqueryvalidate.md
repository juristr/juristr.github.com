---
layout: post
title: "jQuery Validation with Bootstrap"
description: ""
category:
postimg: "/blog/assets/imgs/bootstraperrorhighlighting.png"
tags: []
---

Client-side validation is a must in any proper application as it gives the user an instantaneous feedback about potential problems caused by his input. In this field, you're best served with jQuery validation, especially because you probably already use jQuery as a base library, so...This article demonstrates on how to properly place the displayed validation errors when using [Boostrap](http://twitter.github.com/bootstrap/) as the base framework for styling the app.

## How Bootstrap intends to be used for displaying inline form errors

Bootstrap's error highlighting can be seen from [their docs](http://twitter.github.com/bootstrap/base-css.html#forms). It is basically a combination of adding a class `error` on the most outer div that specifies a control group and a span with a class `help-inline` just beneath the target input control. For example

<figure>
    <img src="/blog/assets/imgs/bootstraperrorhighlighting.png" />
    <figcaption>How Bootstrap handles error displaying</figcaption>
</figure>

The according HTML code is something like this:

    <div class="control-group error">
      <label class="control-label" for="inputError">Input with error</label>
      <div class="controls">
        <input type="text" id="inputError">
        <span class="help-inline">Please correct the error</span>
      </div>
    </div>

## Error Placement

An according error placement could look as follows. Basically the only thing it does is to augment the correct parent container with the `error` class s.t. the text-field gets highlighted.

    //jQuery validation defaults
    $.validator.setDefaults({
        errorElement: "span",
        onfocusout: function (element) {
            $(element).valid();
        },
        highlight: function(element, errorClass, validClass){
            $(element).parents("div.control-group").addClass("error");
        },
        unhighlight: function(element, errorClass, validClass){
            $(element).parents(".error").removeClass("error");
        },
        errorClass: 'help-inline'
    });

That works just fine:

![](/blog/assets/imgs/bootstrapvalidate_inputs_working.png)

The text-field gets highlighted and the proper error message displayed.

### Appended Inputs
What does it look on appended inputs however?? Those are fields having something attached to the input-field, for instance:
<figure>
    <img src="/blog/assets/imgs/bootstrapvalidate_appendedinputs_sample.png" />
    <figcaption>Example of a bootstrap appended field</figcaption>
</figure>

The result:
<figure>
    <img src="/blog/assets/imgs/bootstrapvalidate_appendedinputs_wrong.png" />
    <figcaption>Error msg placement doesn't work on appended inputs</figcaption>
</figure>

Not really what we would expect, right? The problem is that by default the error messag is directly appended after the input field

![](/blog/assets/imgs/bootstrapvalidate_appendedinputs_wrongcode.png)

So basically we have to check on whether the input-field is wrapped within a container having the class `input-append` or `input-prepend` (as bootstrap allows for [both possibilities](http://twitter.github.com/bootstrap/base-css.html#forms)) and in such case append the message to that container instead of the input-field directly.  
Implementing this approach can be done by "overriding" the `errorPlacement` function of the jQuery validate plugin like this:

    ...
    errorPlacement: function (error, $element) {
        var $parent = $element.parent();
        if($parent.hasClass('input-append')){
            //we have to go a level up
            error.insertAfter($parent);
        }else{
            //just proceed normally, i.e. the default behavior
            error.insertAfter($element);
        }
    }
    ...


