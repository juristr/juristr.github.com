System.register(['angular2/angular2', 'angular2/http', './services/ng2-progress.service', './directives/chart.directive', './components/open-issues.component', './components/resolved-issues.component', './components/current-pace.component', './components/release-date.component', './components/last-update.component'], function(exports_1) {
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
    var angular2_1, http_1, ng2_progress_service_1, chart_directive_1, open_issues_component_1, resolved_issues_component_1, current_pace_component_1, release_date_component_1, last_update_component_1;
    var Ng2Beta;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_progress_service_1_1) {
                ng2_progress_service_1 = ng2_progress_service_1_1;
            },
            function (chart_directive_1_1) {
                chart_directive_1 = chart_directive_1_1;
            },
            function (open_issues_component_1_1) {
                open_issues_component_1 = open_issues_component_1_1;
            },
            function (resolved_issues_component_1_1) {
                resolved_issues_component_1 = resolved_issues_component_1_1;
            },
            function (current_pace_component_1_1) {
                current_pace_component_1 = current_pace_component_1_1;
            },
            function (release_date_component_1_1) {
                release_date_component_1 = release_date_component_1_1;
            },
            function (last_update_component_1_1) {
                last_update_component_1 = last_update_component_1_1;
            }],
        execute: function() {
            Ng2Beta = (function () {
                function Ng2Beta(ng2Progress) {
                    this.ng2Progress = ng2Progress;
                }
                Ng2Beta = __decorate([
                    angular2_1.Component({
                        selector: 'ng2beta',
                        styles: [
                            "\n        a {\n            color: white;\n        }\n\n\t .subtitle {\n\t\tfont-size: 20px;\n\t  }\n      "
                        ],
                        template: "\n      <div class=\"android-be-together-section-hero\">\n        <div class=\"logo-font android-slogan\">\n          <h3>Angular 2 Release Candidate Burndown</h3>\n\t\t<span class=\"subtitle\">Estimated date based on current speed</span>\n          <h1 [release-date]=\"ng2Progress.data\"></h1>\n        </div>\n        <!--<p>Check out the <a href=\"http://angularjs.blogspot.it/2015/12/angular-2-beta.html\">blog post</a> or listen into the <a href=\"https://www.youtube.com/watch?v=WitNPCLSZr0\">Angular Air broadcast with the team</a>.</p>-->\n        <div class=\"logo-font android-sub-slogan\">\n          Progress monitor towards release candidate.\n        </div>\n        <br />\n        <div>\n          Currently, <strong><span [resolved-issues]=\"ng2Progress.data\"></span></strong> of the issues have been resolved with another\n          <strong><span [open-issues]=\"ng2Progress.data\">{{value}}</span></strong> open issues.\n          <!--In the last 5 days, on average per day {{ng2Progress.newOpenAvg}} new issues have been assigned and {{ng2Progress.newClosedAvg}} have been closed/removed from the milestone\n          target.-->\n          <br/>\n          (last update: <span [last-update]=\"ng2Progress.data\"></span>)\n        </div>\n        <div class=\"chart-container mdl-typography--text-center\">\n          <canvas id=\"mychart\" [chart]=\"ng2Progress.data\"></canvas>\n        </div>\n        <!--<p>\n          Also, check out <a href=\"/blog/tags/#Angular.js\">some of my articles on Angular 1.x</a> and <a href=\"/blog/tags/#Angular\">Angular 2</a> and/or <a href=\"https://twitter.com/juristr\">follow me on Twitter</a> for getting notified about new articles I'm releasing.<br/>\n          I'm also working on a screencast series on Angular 2, so stay tuned ;)\n        </p>-->\n        <p style=\"font-size:19px\">Check out my new <a href=\"/blog/2016/04/learning-angular2-directives-course/\"><strong>video course on \"Learning Angular 2 Directives\"!</strong></p>\n        <br />\n        <a href=\"https://github.com/angular/angular/milestones\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" style=\"background-color: #ff9800; color: #fff\">\n          Verify milestone progress\n        </a>\n        <a href=\"https://github.com/angular/angular/labels/hotlist%3A%20community-help\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" style=\"background-color: #fff; color: #000\">\n          Help the Angular team!\n        </a>\n        <br/>\n        <br/>\n      </div>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES, chart_directive_1.Chart, open_issues_component_1.OpenIssuesCmp, resolved_issues_component_1.ResolvedIssuesCmp, current_pace_component_1.CurrentPaceCmp, release_date_component_1.ReleaseDateCmp, last_update_component_1.LastUpdateCmp]
                    }), 
                    __metadata('design:paramtypes', [ng2_progress_service_1.Ng2Progress])
                ], Ng2Beta);
                return Ng2Beta;
            })();
            exports_1("Ng2Beta", Ng2Beta);
            // Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
            angular2_1.bootstrap(Ng2Beta, [http_1.HTTP_PROVIDERS, ng2_progress_service_1.Ng2Progress]);
        }
    }
});
