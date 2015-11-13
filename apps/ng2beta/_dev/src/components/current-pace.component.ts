import {Component, Input} from 'angular2/angular2';
import {Ng2Progress} from '../services/ng2-progress.service';

@Component({
  selector: '[current-pace]',
  template: `
   {{value}}
  `
})
export class CurrentPaceCmp {
  @Input('current-pace') data:any;
  public value:string;

  constructor(public ng2Progress: Ng2Progress) {
    
  }
  onChanges() {
    if (this.data) {
      let progressData = this.data.milestonedata;
      this.value = `${this.ng2Progress.calculateAverageCurrentPace(progressData)}%`;
    }
  }
}