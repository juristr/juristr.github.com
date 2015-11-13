System.register(['angular2/angular2', '../services/ng2-progress.service'], function(exports_1) {
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
    var angular2_1, ng2_progress_service_1;
    var ReleaseDateCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (ng2_progress_service_1_1) {
                ng2_progress_service_1 = ng2_progress_service_1_1;
            }],
        execute: function() {
            ReleaseDateCmp = (function () {
                function ReleaseDateCmp(ng2Progress) {
                    this.ng2Progress = ng2Progress;
                }
                ReleaseDateCmp.prototype.onChanges = function () {
                    if (this.data) {
                        this.value = this.ng2Progress.projectedDate.format('dddd, MMMM Do YYYY');
                    }
                };
                __decorate([
                    angular2_1.Input('release-date'), 
                    __metadata('design:type', Object)
                ], ReleaseDateCmp.prototype, "data");
                ReleaseDateCmp = __decorate([
                    angular2_1.Component({
                        selector: '[release-date]',
                        template: "\n   {{value}}\n  "
                    }), 
                    __metadata('design:paramtypes', [ng2_progress_service_1.Ng2Progress])
                ], ReleaseDateCmp);
                return ReleaseDateCmp;
            })();
            exports_1("ReleaseDateCmp", ReleaseDateCmp);
        }
    }
});
