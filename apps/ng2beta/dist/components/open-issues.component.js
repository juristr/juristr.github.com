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
    var OpenIssuesCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            OpenIssuesCmp = (function () {
                function OpenIssuesCmp() {
                }
                OpenIssuesCmp.prototype.onChanges = function () {
                    if (this.data) {
                        var progressData = this.data.milestonedata;
                        this.value = progressData[progressData.length - 1].open;
                    }
                };
                __decorate([
                    angular2_1.Input('open-issues'), 
                    __metadata('design:type', Object)
                ], OpenIssuesCmp.prototype, "data");
                OpenIssuesCmp = __decorate([
                    angular2_1.Component({
                        selector: '[open-issues]',
                        template: "\n    {{value}}\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], OpenIssuesCmp);
                return OpenIssuesCmp;
            })();
            exports_1("OpenIssuesCmp", OpenIssuesCmp);
        }
    }
});
