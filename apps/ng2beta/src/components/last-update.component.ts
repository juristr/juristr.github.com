import {Component, Input} from 'angular2/angular2';
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector: '[last-update]',
  pipes: [TimeAgoPipe],
  template:`
    {{value | amTimeAgo}}
  `
})
export class LastUpdateCmp {
  @Input('last-update') data:any;
  public value:Date;

  constructor() {
    
  }
  onChanges() {
    if (this.data) {
      this.value = new Date(this.data.lastupdated);
    }
  }
}