System.register(['angular2/angular2', 'angular2-moment'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                ], LastUpdateCmp.prototype, "data", void 0);
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
