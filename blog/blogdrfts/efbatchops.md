---
layout: post
title: "Bach Operations with EF"
description: ""
category:
tags: []
---

# 1 Context for all entities

Just open 1 context before the loop, basically
    
    using (var ctx = new EntityContext())
    {
        for (int i = 0; i < items.Count(); i++)
        {
            //read entity

            //do conversion and update entity

            if ((i % 5) == 0)
            {
                ctx.SaveChanges();
            }
        }
    }

Starts fast, but then decreases. After 100 records -> ~150ms per record

# 1 Context per Entry

## Just Save every 5th Record

Is it faster to save only every 5th record??

    for (int i = 0; i < items.Count(); i++)
    {
        using (var ctx = new EntityContext())
        {
            //read entity

            //do conversion and update entity

            if ((i % 5) == 0)
            {
                ctx.SaveChanges();
            }
        }
    }

Avg. Speed: 