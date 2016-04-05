System.register(['angular2/angular2'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1;
    var ResolvedIssuesCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            ResolvedIssuesCmp = (function () {
                function ResolvedIssuesCmp() {
                }
                ResolvedIssuesCmp.prototype.onChanges = function () {
                    if (this.data) {
                        var progressData = this.data.milestonedata;
                        this.value = progressData[progressData.length - 1].percent + '%';
                    }
                };
                __decorate([
                    angular2_1.Input('resolved-issues'), 
                    __metadata('design:type', Object)
                ], ResolvedIssuesCmp.prototype, "data", void 0);
                ResolvedIssuesCmp = __decorate([
                    angular2_1.Component({
                        selector: '[resolved-issues]',
                        template: "\n    {{value}}\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResolvedIssuesCmp);
                return ResolvedIssuesCmp;
            }());
            exports_1("ResolvedIssuesCmp", ResolvedIssuesCmp);
        }
    }
});
