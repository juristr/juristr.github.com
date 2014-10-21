---
layout: articles-post
title: "What's coming in C# vNext (6.0)"
lead: "Overview of the features presented by Filip Ekberg"
show_img_in_detail: true
coverimage: false
category:
tags: ["C#"]
---

<iframe width="853" height="480" src="//www.youtube.com/embed/BA3sL783_Co" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

## C# 2

- Generics
- Partial types
- Anonymous methods
- Iterators
- Nullable types
- Getter/Setter separate accessibility

## C# 3

C# 3.0 introduced some nice features like

- Object and collection initializers
- Autoproperties
- Anonymous types (Linq)
- Extension methods (Linq)
- Query expressions
- Lambdas
- Expression trees
- ...

### Implicitly typed local variables

The `var` keyword initially became a 

## C# 4

- Dynamic binding: `dynamic`, Expando objects
  - IronJS, IronPython, IronRuby,...
- Named and optional parameters
- Generic co- and contravariance
- ...

## C# 5

- Asynchronous methods (`await`)
- Caller info attributes

## C# 6

Roslyn - rewrite, written in C#! It's even Open Source.

### Primary Constructors

```c#
class Person(string name, int age)
{
    private string _name = name;
    private int _age = age;

    private string _address;

    public Person(string name, int age, string address) : this(name, age) 
    {
        _address = address;
    }

}
```

Behind the scenes the compiler will generate the proper constructor for us:

```c#
class Person 
{
    ...
    public Person(string name, int age)
    {
        _age = age;
        _name = name;
    }
    ...
}
```

### Auto-property Initializers

```c#
class Person(string name, int age)
{
    public string Name { get; set; } = name;
}
```

Even this is possible

```c#
class Person(string name, int age)
{
    public string Name { get; } = name;
}
```

Behind the scenes..

```c#
class Person 
{
    private readonly string <Name>k__BackingField;

    public string Name
    {
        get
        {
            return this.<Name>k__BackingField;
        }
    }

    public Person(string name, int age)
    {
         this.<Name>k__BackingField = name;
    }
}
```

### Using statements for static members

```c#
using System.Console;

class Person(string name, int age)
{
    ...
    public void Speak()
    {
        WriteLine("Hi, my name is {0} and I am {1} years old", this.name, this.age);
    }
}
```

Attention if you have a `WriteLine` defined by yourself. That would have precedence over the static using members.

### Dictionary initializers

```c#
class Person(string name)
{
    private Dictionary<string, string> _data = new Dictionary<string, string> { ["Name"] = name };
}
```

### Declaration expressions

```c#
public void Calculate(int birthYear, out int age)
{
    age = DateTime.Now.Year - birthYear;
}
```

Problem so far: you have to declare the variable before the method call:

```c#
int age;
CalculateAgeBasedOn(1985, out age);
...
```

Now it is possible to declare it directly in the method call itself.

```c#
CalculateAgeBasedOn(1985, out var age);
```

### await inside a Finally block

Continue at: http://youtu.be/BA3sL783_Co?t=20m9s


- Exception Filters
- Null Propagation (`somePerson?.Address?.Street?.Name`)



