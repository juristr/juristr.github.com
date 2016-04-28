System.register(['angular2/angular2', 'angular2-moment'], function(exports_1) {
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
    var angular2_1, angular2_moment_1;
    var LastUpdateCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (angular2_moment_1_1) {
                angular2_moment_1 = angular2_moment_1_1;
            }],
        execute: function() {
            LastUpdateCmp = (function () {
                function LastUpdateCmp() {
                }
                LastUpdateCmp.prototype.onChanges = function () {
                    if (this.data) {
                        this.value = new Date(this.data.lastupdated);
                    }
                };
                __decorate([
                    angular2_1.Input('last-update'), 
                    __metadata('design:type', Object)
                ], LastUpdateCmp.prototype, "data");
                LastUpdateCmp = __decorate([
                    angular2_1.Component({
                        selector: '[last-update]',
                        pipes: [angular2_moment_1.TimeAgoPipe],
                        template: "\n    {{value | amTimeAgo}}\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], LastUpdateCmp);
                return LastUpdateCmp;
            })();
            exports_1("LastUpdateCmp", LastUpdateCmp);
        }
    }
});
