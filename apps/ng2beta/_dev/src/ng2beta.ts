import {Component, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Ng2Progress} from './services/ng2-progress.service';
import {Chart} from './directives/chart.directive';
import {OpenIssuesCmp} from './components/open-issues.component';
import {ResolvedIssuesCmp} from './components/resolved-issues.component';
import {CurrentPaceCmp} from './components/current-pace.component';
import {ReleaseDateCmp} from './components/release-date.component';
import {LastUpdateCmp} from './components/last-update.component';

@Component({
    selector: 'ng2beta',
    styles: [
      `
        a {
            color: white;
        }

	 .subtitle {
		font-size: 20px;
	  }
      `
    ],
    template: `
      <div class="android-be-together-section-hero">
        <div class="logo-font android-slogan">
          <h3>Angular 2 Release Candidate Burndown</h3>
		<span class="subtitle">Estimated date based on current speed</span>
          <h1 [release-date]="ng2Progress.data"></h1>
        </div>
        <!--<p>Check out the <a href="http://angularjs.blogspot.it/2015/12/angular-2-beta.html">blog post</a> or listen into the <a href="https://www.youtube.com/watch?v=WitNPCLSZr0">Angular Air broadcast with the team</a>.</p>-->
        <div class="logo-font android-sub-slogan">
          Progress monitor towards release candidate.
        </div>
        <br />
        <div>
          Currently, <strong><span [resolved-issues]="ng2Progress.data"></span></strong> of the issues have been resolved with another
          <strong><span [open-issues]="ng2Progress.data">{{value}}</span></strong> open issues.
          <!--In the last 5 days, on average per day {{ng2Progress.newOpenAvg}} new issues have been assigned and {{ng2Progress.newClosedAvg}} have been closed/removed from the milestone
          target.-->
          <br/>
          (last update: <span [last-update]="ng2Progress.data"></span>)
        </div>
        <div class="chart-container mdl-typography--text-center">
          <canvas id="mychart" [chart]="ng2Progress.data"></canvas>
        </div>
        <!--<p>
          Also, check out <a href="/blog/tags/#Angular.js">some of my articles on Angular 1.x</a> and <a href="/blog/tags/#Angular">Angular 2</a> and/or <a href="https://twitter.com/juristr">follow me on Twitter</a> for getting notified about new articles I'm releasing.<br/>
          I'm also working on a screencast series on Angular 2, so stay tuned ;)
        </p>-->
        <p style="font-size:19px">Remember to <strong>follow me <a href="https://twitter.com/juristr">on Twitter</a></strong> for getting updates around Angular 2!</p>
        <br />
        <a href="https://github.com/angular/angular/milestones" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" style="background-color: #ff9800; color: #fff">
          Verify milestone progress
        </a>
        <a href="https://github.com/angular/angular/labels/hotlist%3A%20community-help" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" style="background-color: #fff; color: #000">
          Help the Angular team!
        </a>
        <br/>
        <br/>
      </div>
    `,
    directives: [CORE_DIRECTIVES, Chart, OpenIssuesCmp, ResolvedIssuesCmp, CurrentPaceCmp, ReleaseDateCmp, LastUpdateCmp]
})
export class Ng2Beta {

    constructor(public ng2Progress: Ng2Progress) {

    }
}

// Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
bootstrap(Ng2Beta, [HTTP_PROVIDERS, Ng2Progress]);