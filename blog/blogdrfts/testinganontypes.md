---
layout: post
title: "Testing Anonymous Types"
description: ""
category: bliki
tags: []
---

Controller method

    public JsonResult CalculateValue(long operationId)
    {
        return Json(new { Sum = 10 }, JsonRequestBehavior.AllowGet);
    }


    [TestMethod]
    public void ShouldCorrectlyReturnTheAmountForOperation61()
    {
        var operationId = 61;

        dynamic importiBaseList = operazioniController.GetTotalAmount(operationId).Data;

        Assert.AreEqual(44.24m, importiBaseList.importo, "the amount should match");
    }