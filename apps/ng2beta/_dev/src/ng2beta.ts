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
    template: `
      <div class="android-be-together-section-hero">
        <div class="logo-font android-slogan">
          <h3>Angular 2 Beta Release Projection</h3>
          <h1 [release-date]="ng2Progress.data"></h1>
        </div>
        <div class="logo-font android-sub-slogan">
          This is the projected release date based on the current pace of <strong><span [current-pace]="ng2Progress.data">{{value}}</span> of the issues being resolved per day.</strong>
          <br/>
        </div>
        <br />
        <div>
          Currently, <strong><span [resolved-issues]="ng2Progress.data"></span></strong> of the issues have been resolved with another 
          <strong><span [open-issues]="ng2Progress.data">{{value}}</span></strong> open issues.<br/>
          In the last 5 days, on average per day {{ng2Progress.newOpenAvg}} new issues have been assigned and {{ng2Progress.newClosedAvg}} have been closed/removed from the milestone
          target.
          <br/>
          (last update: <span [last-update]="ng2Progress.data"></span>)
        </div>
        <div class="chart-container mdl-typography--text-center">
          <canvas id="mychart" [chart]="ng2Progress.data"></canvas>
        </div>
        <br /><br />
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