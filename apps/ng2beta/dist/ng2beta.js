System.register(['angular2/angular2', 'angular2/http', './services/ng2-progress.service', './directives/chart.directive', './components/open-issues.component', './components/resolved-issues.component', './components/current-pace.component', './components/release-date.component', './components/last-update.component'], function(exports_1, context_1) {
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
                        template: "\n      <div class=\"android-be-together-section-hero\">\n        <div class=\"logo-font android-slogan\">\n          <!--<h3>Angular 2 Release Candidate is out!!</h3>-->\n\t\t      <!--<span class=\"subtitle\">Estimated date based on current speed</span>-->\n          <!--<h1 [release-date]=\"ng2Progress.data\"></h1>-->\n          <h1>14th September 2016??</h1>\n        </div>\n        <div>\n          <img src=\"http://juristr.com/blog/assets/imgs/angular2logo.svg\" style=\"width:150px;height:150px\" />\n        </div>\n        <!--<p>Check out the <a href=\"http://angularjs.blogspot.it/2015/12/angular-2-beta.html\">blog post</a> or listen into the <a href=\"https://www.youtube.com/watch?v=WitNPCLSZr0\">Angular Air broadcast with the team</a>.</p>-->\n        <!--\n        <div class=\"logo-font android-sub-slogan\">\n          Progress monitor towards release candidate.\n        </div>\n        -->\n        <br />\n        <!--\n        <div>\n          Currently, <strong><span [resolved-issues]=\"ng2Progress.data\"></span></strong> of the issues have been resolved with another\n          <strong><span [open-issues]=\"ng2Progress.data\">{{value}}</span></strong> open issues.\n          In the last 5 days, on average per day {{ng2Progress.newOpenAvg}} new issues have been assigned and {{ng2Progress.newClosedAvg}} have been closed/removed from the milestone\n          target.\n          <br/>\n          (last update: <span [last-update]=\"ng2Progress.data\"></span>)\n        </div>\n        <div class=\"chart-container mdl-typography--text-center\">\n          <canvas id=\"mychart\" [chart]=\"ng2Progress.data\"></canvas>\n        </div>\n        -->\n        <!--<p>\n          Also, check out <a href=\"/blog/tags/#Angular.js\">some of my articles on Angular 1.x</a> and <a href=\"/blog/tags/#Angular\">Angular 2</a> and/or <a href=\"https://twitter.com/juristr\">follow me on Twitter</a> for getting notified about new articles I'm releasing.<br/>\n          I'm also working on a screencast series on Angular 2, so stay tuned ;)\n        </p>\n        <p style=\"font-size:19px\">Also, check out my new <a href=\"/blog/2016/04/learning-angular2-directives-course/\"><strong>video course on \"Learning Angular 2 Directives\"!</strong></p>\n        -->\n        <p style=\"font-size:19px\">\n        There's a <a href=\"http://www.meetup.com/AngularJS-MTV/events/233816242/\">special event</a> by Google in Mountain View<br />\n        Also make sure <a href=\"https://twitter.com/juristr\">to follow me on Twitter</a> for news and updates!\n         </p>\n        <br />\n        <a href=\"https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc0-2016-05-02\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" style=\"background-color: #ff9800; color: #fff\">\n          View the changelog\n        </a>\n        <a href=\"https://twitter.com/intent/tweet?hashtags=angular2&original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&ref_src=twsrc%5Etfw&text=Angular%202%20release%20candidate%20is%20out!!&tw_p=tweetbutton&url=http%3A%2F%2Fjuristr.com%2Fapps%2Fng2beta%2F&via=juristr\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" data-url=\"http://juristr.com/apps/ng2beta/\" data-text=\"Angular 2 release candidate is out!!\" data-via=\"juristr\" data-size=\"large\" data-hashtags=\"angular2\">Tweet it!</a>\n        <a href=\"https://twitter.com/juristr\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" style=\"background-color: rgb(3, 169, 244);\">\n          Follow me\n        </a>\n\t<br/>\n        <br/>\n        <!--<i>Stand by as this site start tracking of the <a href=\"https://github.com/angular/angular/milestones\">final release</a> as soon as development starts</i>-->\n      </div>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES, chart_directive_1.Chart, open_issues_component_1.OpenIssuesCmp, resolved_issues_component_1.ResolvedIssuesCmp, current_pace_component_1.CurrentPaceCmp, release_date_component_1.ReleaseDateCmp, last_update_component_1.LastUpdateCmp]
                    }), 
                    __metadata('design:paramtypes', [ng2_progress_service_1.Ng2Progress])
                ], Ng2Beta);
                return Ng2Beta;
            }());
            exports_1("Ng2Beta", Ng2Beta);
            // Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
            angular2_1.bootstrap(Ng2Beta, [http_1.HTTP_PROVIDERS, ng2_progress_service_1.Ng2Progress]);
        }
    }
});
