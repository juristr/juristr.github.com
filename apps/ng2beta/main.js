  'use strict';

  $.get('./data.json', function(data) {
    $('#lastupdate').html(data.lastupdated);
    var progressData = data.milestonedata;
    var chartDataSet = {
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
    for(var i=0; i<progressData.length; i++){
      chartDataSet.labels.push(progressData[i].date);

      // open issues
      chartDataSet.datasets[0].data.push(progressData[i].open || 0);

      // percentage done
      chartDataSet.datasets[1].data.push(progressData[i].percent || 0);
    }

    var currentPace = calculateAverageCurrentPace(progressData);
    var daysRemaining = calculateDaysRemaining(progressData);
    var projectedDate = moment().add(daysRemaining, 'days');

    // add last projected dates to chart
    chartDataSet.labels.push(projectedDate.format('YYYY-MM-DD'));
    chartDataSet.datasets[0].data.push(0);
    chartDataSet.datasets[1].data.push(100);

    // create chart
    var ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx).Line(chartDataSet, {
      responsive: true,
      // maintainAspectRatio: true,
      scaleBeginAtZero: true,
      scaleFontColor: "#fff",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    $('#releasedate').html(projectedDate.format('dddd, MMMM Do YYYY'));
    $('#currentPace').html(currentPace + '%');
    $('#resolvedIssuesPercent').html(progressData[progressData.length - 1].percent + '%');
    $('#openIssues').html(progressData[progressData.length - 1].open);
  });

  function calculateAverageCurrentPace(progressData) {
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

  function calculateDaysRemaining(progressData) {
    var percentageMissing = 100 - progressData[progressData.length - 1].percent;
    var avgPacePerDay = calculateAverageCurrentPace(progressData);

    return Math.round(percentageMissing / avgPacePerDay);
  }