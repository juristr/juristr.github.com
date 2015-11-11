import {Component, Input} from 'angular2/angular2';
import {Ng2Progress} from '../services/ng2-progress.service';

@Component({
  selector: '[release-date]',
  template: `
   {{value}}
  `
})
export class ReleaseDateCmp {
  @Input('release-date') data:any;
  public value:string;

  constructor(public ng2Progress: Ng2Progress) {
    
  }
  onChanges() {
    if (this.data) {
      this.value = this.ng2Progress.projectedDate.format('dddd, MMMM Do YYYY');
    }
  }
}