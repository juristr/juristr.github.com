import {Injectable, ElementRef} from 'angular2/angular2';
import {Http} from 'angular2/http';

interface MilestoneResponse {
  date: string,
  milestonedata: MilestoneDayStat[]
}

interface MilestoneDayStat {
  date: string,
  open: number,
  closed: number,
  percent: number,
  pace: number,
  newOpen: number,
  newClosed: number
}

@Injectable()
export class Ng2Progress {

  public data: MilestoneResponse;
  public projectedDate: any;
  public newOpenAvg: number;
  public newClosedAvg: number;
  public evaluationRange: number = 14;

  constructor(public http: Http) {
    this.http.get('./data-final.json')
      .map(res => res.json())
      .subscribe(res => {
        this.data = res;
        let progressData = this.data.milestonedata;

        // let daysRemaining = this.calculateDaysRemaining(progressData);
        // this.projectedDate = moment().add(daysRemaining, 'days');

        // let startIdx = this.data.milestonedata.length - this.evaluationRange;
        // let newOpenSum: number = 0;
        // let newClosedSum: number = 0;
        // for (let i = startIdx; i < this.data.milestonedata.length; i++) {
        //   newOpenSum += this.data.milestonedata[i].newOpen;
        //   newClosedSum += this.data.milestonedata[i].newClosed;
        // }

        // this.newOpenAvg = Math.round((newOpenSum / (this.data.milestonedata.length - startIdx)));
        // this.newClosedAvg = Math.round((newClosedSum / (this.data.milestonedata.length - startIdx)));

        // $('#releasedate').html(projectedDate.format('dddd, MMMM Do YYYY'));
        // $('#currentPace').html(currentPace + '%');
        // $('#resolvedIssuesPercent').html(progressData[progressData.length - 1].percent + '%');
        // $('#openIssues').html(progressData[progressData.length - 1].open);
      });
  }
  generateChart(el: ElementRef, chartDataSet: any): void {
    new Chart(el.nativeElement.getContext("2d")).Line(chartDataSet, {
      responsive: true,
      bezierCurve: false,
      bezierCurveTension: 0.2,
      // maintainAspectRatio: true,
      scaleBeginAtZero: true,
      scaleFontColor: "#fff",
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
  }
  calculateAverageCurrentPace(progressData: MilestoneDayStat[]): number {
    var paces = [];
    var paceTotal = 0;
    var avgPace = 0;

    let startIdx = this.data.milestonedata.length - this.evaluationRange;


    for (var i = startIdx + 1; i <= progressData.length - 1; i++) {
      var day1 = moment(progressData[i - 1].date);
      var day2 = moment(progressData[i].date);

      var daysDifference = moment.duration(day2.diff(day1)).get('days');

      var percentage = (progressData[i].percent - progressData[i - 1].percent) / daysDifference;
      paces.push(Math.round(percentage));
      paceTotal += Math.round(percentage);
    }

    avgPace = paceTotal / paces.length;
    return Math.round(avgPace);
  }
  calculateDaysRemaining(progressData: MilestoneDayStat[]): number {
    var percentageMissing = 100 - progressData[progressData.length - 1].percent;
    var avgPacePerDay = this.calculateAverageCurrentPace(progressData);

    return Math.round(percentageMissing / avgPacePerDay);
  }
}