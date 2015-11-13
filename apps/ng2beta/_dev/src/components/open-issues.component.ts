import {Component, Input} from 'angular2/angular2';

@Component({
  selector: '[open-issues]',
  template: `
    {{value}}
  `
})
export class OpenIssuesCmp {
  @Input('open-issues') data:any;
  public value:number;

  onChanges() {
    if (this.data) {
      let progressData = this.data.milestonedata;
      this.value = progressData[progressData.length - 1].open;
    }
  }
}