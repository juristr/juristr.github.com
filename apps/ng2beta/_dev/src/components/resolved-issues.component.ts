import {Component, Input} from 'angular2/angular2';

@Component({
  selector: '[resolved-issues]',
  template: `
    {{value}}
  `
})
export class ResolvedIssuesCmp {
  @Input('resolved-issues') data:any;
  public value:string;

  onChanges() {
    if (this.data) {
      let progressData = this.data.milestonedata;
      this.value = progressData[progressData.length - 1].percent + '%';
    }
  }
}