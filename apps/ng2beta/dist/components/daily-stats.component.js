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
    var DailyStatsCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            DailyStatsCmp = (function () {
                function DailyStatsCmp() {
                }
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', String)
                ], DailyStatsCmp.prototype, "title");
                DailyStatsCmp = __decorate([
                    angular2_1.Component({
                        selector: 'daily-stats',
                        template: "\n   <h1>Daily</h1>\n   <div>\n    <span class=\"stats-value\">2</span>\n    <span class=\"stats-value-title\">new opened</span>\n   </div>\n   <div>\n      <span class=\"stats-value\">1</span>\n      <span class=\"stats-value-title\">closed</span>\n   </div>\n  ",
                        styles: ["\n \n    h1 {\n      font-size:28px;\n      padding-bottom:5px;\n      margin-bottom:5px; \n    }\n  \n    .stats-value {\n      font-size: 24px;\n      font-weight: bold;\n      display:block;\n    }\n    \n    .stats-value-title {\n      font-size: 12px;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DailyStatsCmp);
                return DailyStatsCmp;
            })();
            exports_1("DailyStatsCmp", DailyStatsCmp);
        }
    }
});
