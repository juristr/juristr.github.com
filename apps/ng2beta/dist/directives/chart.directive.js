System.register(['angular2/angular2', '../services/ng2-progress.service'], function(exports_1) {
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
    var Chart;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (ng2_progress_service_1_1) {
                ng2_progress_service_1 = ng2_progress_service_1_1;
            }],
        execute: function() {
            Chart = (function () {
                function Chart(el, ng2Progress) {
                    this.el = el;
                    this.ng2Progress = ng2Progress;
                }
                Chart.prototype.onChanges = function () {
                    if (this.data) {
                        var progressData = this.data.milestonedata;
                        var chartDataSet = {
                            labels: [],
                            datasets: [{
                                    label: 'Issues open',
                                    fillColor: 'rgba(151,187,205,0.2)',
                                    strokeColor: 'rgba(221, 62, 42, 1)',
                                    pointColor: 'rgba(221, 62, 42, 1); ',
                                    pointStrokeColor: '#fff',
                                    pointHighlightFill: '#fff',
                                    pointHighlightStroke: 'rgba(220,220,220,1)',
                                    data: []
                                }
                            ]
                        };
                        // build up the dataset for the chart
                        for (var _i = 0; _i < progressData.length; _i++) {
                            var d = progressData[_i];
                            chartDataSet.labels.push(d.date);
                            // open issues
                            chartDataSet.datasets[0].data.push(d.open || 0);
                        }
                        // add last projected dates to chart
                        // chartDataSet.labels.push(this.ng2Progress.projectedDate.format('YYYY-MM-DD'));
                        chartDataSet.datasets[0].data.push(0);
                        //chartDataSet.datasets[1].data.push(100);
                        // pass out of this context to generate chart
                        // see below notes...
                        this.ng2Progress.generateChart(this.el, chartDataSet);
                    }
                };
                __decorate([
                    angular2_1.Input('chart'), 
                    __metadata('design:type', Object)
                ], Chart.prototype, "data", void 0);
                Chart = __decorate([
                    angular2_1.Directive({
                        selector: '[chart]'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof angular2_1.ElementRef !== 'undefined' && angular2_1.ElementRef) === 'function' && _a) || Object, ng2_progress_service_1.Ng2Progress])
                ], Chart);
                return Chart;
                var _a;
            })();
            exports_1("Chart", Chart);
        }
    }
});
