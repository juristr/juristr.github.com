import {Injectable, ElementRef} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class Ng2Progress {
  public data:any;
  public projectedDate:any;
  constructor(public http: Http) {
    this.http.get('./data.json')
      .map(res => res.json())
      .subscribe(res => {
        this.data = res;
        let progressData = this.data.milestonedata;
        let daysRemaining = this.calculateDaysRemaining(progressData);
        this.projectedDate = moment().add(daysRemaining, 'days');
        
      
    
        // $('#releasedate').html(projectedDate.format('dddd, MMMM Do YYYY'));
        // $('#currentPace').html(currentPace + '%');
        // $('#resolvedIssuesPercent').html(progressData[progressData.length - 1].percent + '%');
        // $('#openIssues').html(progressData[progressData.length - 1].open);
      });   
  }
  generateChart(el: ElementRef, chartDataSet:any):void {
    new Chart(el.nativeElement.getContext("2d")).Line(chartDataSet, {
      responsive: true,
      bezierCurve : false,
      bezierCurveTension : 0.2,
      // maintainAspectRatio: true,
      scaleBeginAtZero: true,
      scaleFontColor: "#fff",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
  }
  calculateAverageCurrentPace(progressData):number {
    var paces = [];
    var paceTotal = 0;
    var avgPace = 0;

    for (var i = 1; i <= progressData.length - 1; i++) {
      var day1 = moment(progressData[i - 1].date);
      var day2 = moment(progressData[i].date);

      var daysDifference = moment.duration(day2.diff(day1)).get('days');

      var percentage = (progressData[i].percent - progressData[i - 1].percent) / daysDifference;
      paces.push(Math.round(percentage));
      paceTotal += Math.round(percentage);
    }

    avgPace = paceTotal / paces.length;
    return avgPace;
  }   
  calculateDaysRemaining(progressData):number {
    var percentageMissing = 100 - progressData[progressData.length - 1].percent;
    var avgPacePerDay = this.calculateAverageCurrentPace(progressData);

    return Math.round(percentageMissing / avgPacePerDay);
  }
}