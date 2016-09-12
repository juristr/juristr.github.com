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
          <h3>Angular 2 Final Release Date</h3>
		      <!--<span class="subtitle">Estimated date based on current speed</span>-->
          <!--<h1 [release-date]="ng2Progress.data"></h1>-->
          <h1>14th September 2016??</h1>
        </div>
        <div>
          <img src="http://juristr.com/blog/assets/imgs/angular2logo.svg" style="width:150px;height:150px" />
        </div>
        <!--<p>Check out the <a href="http://angularjs.blogspot.it/2015/12/angular-2-beta.html">blog post</a> or listen into the <a href="https://www.youtube.com/watch?v=WitNPCLSZr0">Angular Air broadcast with the team</a>.</p>-->
        <!--
        <div class="logo-font android-sub-slogan">
          Progress monitor towards release candidate.
        </div>
        -->
        <br />
        <!--
        <div>
          Currently, <strong><span [resolved-issues]="ng2Progress.data"></span></strong> of the issues have been resolved with another
          <strong><span [open-issues]="ng2Progress.data">{{value}}</span></strong> open issues.
          In the last 5 days, on average per day {{ng2Progress.newOpenAvg}} new issues have been assigned and {{ng2Progress.newClosedAvg}} have been closed/removed from the milestone
          target.
          <br/>
          (last update: <span [last-update]="ng2Progress.data"></span>)
        </div>
        <div class="chart-container mdl-typography--text-center">
          <canvas id="mychart" [chart]="ng2Progress.data"></canvas>
        </div>
        -->
        <!--<p>
          Also, check out <a href="/blog/tags/#Angular.js">some of my articles on Angular 1.x</a> and <a href="/blog/tags/#Angular">Angular 2</a> and/or <a href="https://twitter.com/juristr">follow me on Twitter</a> for getting notified about new articles I'm releasing.<br/>
          I'm also working on a screencast series on Angular 2, so stay tuned ;)
        </p>
        <p style="font-size:19px">Also, check out my new <a href="/blog/2016/04/learning-angular2-directives-course/"><strong>video course on "Learning Angular 2 Directives"!</strong></p>
        -->
        <p style="font-size:19px">
        There's a <a href="http://www.meetup.com/AngularJS-MTV/events/233816242/">special event</a> by Google in Mountain View<br />
        Also make sure <a href="https://twitter.com/juristr">to follow me on Twitter</a> for news and updates!
         </p>
        <br />
        <a href="https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc0-2016-05-02" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" style="background-color: #ff9800; color: #fff">
          View the changelog
        </a>
        <a href="https://twitter.com/intent/tweet?hashtags=angular2&original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&ref_src=twsrc%5Etfw&text=Angular%202%20final%20may%20be%20out%20soon!%20Keep%20an%20eye%20on%20this%20site%20for%20more%20info%20%3A)&tw_p=tweetbutton&url=http%3A%2F%2Fjuristr.com%2Fapps%2Fng2beta%2F&via=juristr" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" data-url="http://juristr.com/apps/ng2beta/" data-text="#angular2 final may be released soon!! Keep an eye on this site :)" data-via="juristr" data-size="large" data-hashtags="angular2">Tweet it!</a>
        <a href="https://twitter.com/juristr" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" style="background-color: rgb(3, 169, 244);">
          Follow me
        </a>
	<br/>
        <br/>
        <!--<i>Stand by as this site start tracking of the <a href="https://github.com/angular/angular/milestones">final release</a> as soon as development starts</i>-->
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