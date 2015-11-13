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
                                },
                                {
                                    label: 'Percentage done',
                                    fillColor: 'rgba(151,187,205,0.2)',
                                    strokeColor: 'rgba(151,187,205,1)',
                                    pointColor: 'rgba(151,187,205,1)',
                                    pointStrokeColor: '#fff',
                                    pointHighlightFill: '#fff',
                                    pointHighlightStroke: 'rgba(151,187,205,1)',
                                    data: []
                                }]
                        };
                        // build up the dataset for the chart
                        for (var _i = 0; _i < progressData.length; _i++) {
                            var d = progressData[_i];
                            chartDataSet.labels.push(d.date);
                            // open issues
                            chartDataSet.datasets[0].data.push(d.open || 0);
                            // percentage done
                            chartDataSet.datasets[1].data.push(d.percent || 0);
                        }
                        // add last projected dates to chart
                        chartDataSet.labels.push(this.ng2Progress.projectedDate.format('YYYY-MM-DD'));
                        chartDataSet.datasets[0].data.push(0);
                        chartDataSet.datasets[1].data.push(100);
                        // pass out of this context to generate chart
                        // see below notes...
                        this.ng2Progress.generateChart(this.el, chartDataSet);
                    }
                };
                __decorate([
                    angular2_1.Input('chart'), 
                    __metadata('design:type', Object)
                ], Chart.prototype, "data");
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
