import {Directive, Input, ElementRef} from 'angular2/angular2';
import {Ng2Progress} from '../services/ng2-progress.service';

@Directive({
  selector: '[chart]'
})
export class Chart {
  @Input('chart') data:any;
  
  constructor(private el: ElementRef, private ng2Progress: Ng2Progress) {

  }
  onChanges() {
    if (this.data) {
      let progressData = this.data.milestonedata;
      let chartDataSet:any = {
        labels: [],
        datasets: [{
          label: 'Issues open',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(221, 62, 42, 1)',
          pointColor: 'rgba(221, 62, 42, 1); ',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: []
        },
        {
          label: 'Percentage done',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: []
        }]
      };
  
      // build up the dataset for the chart
      for(let d of progressData){
        chartDataSet.labels.push(d.date);
  
        // open issues
        chartDataSet.datasets[0].data.push(d.open || 0);
  
        // percentage done
        chartDataSet.datasets[1].data.push(d.percent || 0);
      }
  
      // add last projected dates to chart
      chartDataSet.labels.push(this.ng2Progress.projectedDate.format('YYYY-MM-DD'));
      chartDataSet.datasets[0].data.push(0);
      chartDataSet.datasets[1].data.push(100);
      
      // pass out of this context to generate chart
      // see below notes...
      this.ng2Progress.generateChart(this.el, chartDataSet);   
      
      // TODO: figure out why we cannot do the following in here...
      //
      // the canvas 2d context is not correct when creating from inside onChanges
      //
      // new Chart(this.el.nativeElement.getContext("2d")).Line(chartDataSet, {
      //   responsive: true,
      //   bezierCurve : false,
      //   bezierCurveTension : 0.2,
      //   // maintainAspectRatio: true,
      //   scaleBeginAtZero: true,
      //   scaleFontColor: "#fff",
      //   legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      // });
    }
  }
  
}