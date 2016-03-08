System.register(['angular2/angular2'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                ], ResolvedIssuesCmp.prototype, "data");
                ResolvedIssuesCmp = __decorate([
                    angular2_1.Component({
                        selector: '[resolved-issues]',
                        template: "\n    {{value}}\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResolvedIssuesCmp);
                return ResolvedIssuesCmp;
            })();
            exports_1("ResolvedIssuesCmp", ResolvedIssuesCmp);
        }
    }
});
