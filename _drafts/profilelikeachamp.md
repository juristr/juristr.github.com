---
layout: post
title: "Profile your App like a Champ"
description: ""
category:
tags: [.Net, C#]
---

Normally, when you develop you jump straight into your TDD cycle, hammering down the code required to properly implement the required functionality. Non-functional requirements like performance are most often only targeted at the end when it actually becomes a problem. Such an approach might work just perfectly as you would not like to invest resources just to fine-tune something which in the end might actually not need any tuning at all. But still, what about if you could shorten that feedback cycle as well, similar as when developing in a test-driven style?

I'm sure you did already hear about the amazing guys that build the Stackexchange plattform. I'm quite sure you did. Well, beside releasing probably the [fastest ORM mapper](http://code.google.com/p/dapper-dot-net/) they also developed a tiny utility for profiling your application: [MiniProfiler](http://miniprofiler.com/).

## Installation and Setup

### Installation in ASP.net MVC applications

### Using MiniProfiler in Single Page JavaScript applications

## Example

Consider the following piece of code:

        public PagedEnumerable<Person> FilterPersonsPaged(string fiscalcode, string surname, string name, string birthNation, int? birthMunicipality, DateTime? birthDate, int? currentPage, int? pageSize)
        {
            var personList = personRepository.FilterPersonsPaged(fiscalcode, surname, name, birthNation, birthMunicipality, birthDate, currentPage, pageSize);

            if (personList != null && personList.Rows.Count() > 0)
            {
                var municipalityIds = new List<int>();
                foreach (var person in personList.Rows)
                {
                    if (person.IdComuneNascita.HasValue)
                        municipalityIds.Add(person.IdComuneNascita.Value);
                }

                var municipalities = comuneBl.GetAllMunicipalitiesMatchingByIdList(municipalityIds);
                foreach (var municipality in municipalities)
                {
                    var correspondingPerson = personList.Rows.FirstOrDefault(x => x.IdComuneNascita == municipality.Id);
                    correspondingPerson.ComuneNascita = municipality;
                }
            }

            return personList;
        }

