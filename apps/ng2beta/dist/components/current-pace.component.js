System.register(['angular2/angular2', '../services/ng2-progress.service'], function(exports_1, context_1) {
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
    var angular2_1, ng2_progress_service_1;
    var CurrentPaceCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (ng2_progress_service_1_1) {
                ng2_progress_service_1 = ng2_progress_service_1_1;
            }],
        execute: function() {
            CurrentPaceCmp = (function () {
                function CurrentPaceCmp(ng2Progress) {
                    this.ng2Progress = ng2Progress;
                }
                CurrentPaceCmp.prototype.onChanges = function () {
                    if (this.data) {
                        var progressData = this.data.milestonedata;
                        this.value = this.ng2Progress.calculateAverageCurrentPace(progressData) + "%";
                    }
                };
                __decorate([
                    angular2_1.Input('current-pace'), 
                    __metadata('design:type', Object)
                ], CurrentPaceCmp.prototype, "data", void 0);
                CurrentPaceCmp = __decorate([
                    angular2_1.Component({
                        selector: '[current-pace]',
                        template: "\n   {{value}}\n  "
                    }), 
                    __metadata('design:paramtypes', [ng2_progress_service_1.Ng2Progress])
                ], CurrentPaceCmp);
                return CurrentPaceCmp;
            }());
            exports_1("CurrentPaceCmp", CurrentPaceCmp);
        }
    }
});
