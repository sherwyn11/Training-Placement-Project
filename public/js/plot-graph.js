axios.post('/plot-graph-data', {
    data: "Test"
})
.then(function (response) {
    var appliedData = response.data.appliedData
    var selectedData = response.data.selectedData
    drawChart(appliedData, selectedData)
}).catch(function (error) {
    console.log(error);
});

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'bar']});
  
function drawChart(appliedData, selectedData) {
    var compData = []
    for(var i = 0; i < appliedData.length; i++){
        compData.push([{v: appliedData[i].name, f: appliedData[i].name}, appliedData[i].size, selectedData[i].size])
    }
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Company');
    data.addColumn('number', 'Applied Students');
    data.addColumn('number', 'Selected Students');

    data.addRows(compData);
    console.log(compData)
    var options = {
      title: 'Company Wise Data',
      hAxis: {
        title: 'Company',
        viewWindow: {
          min: [7, 30, 0],
          max: [27, 30, 0]
        }
      },
      vAxis: {
        title: 'Number of Students'
      }
    };
    var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
    materialChart.draw(data, options);
} 


function getNewCompany(){
    location.href = '/new-company'
}