//charts
var NRU = document.getElementById('NRU').getContext('2d');
var DAU = document.getElementById('DAU').getContext('2d');
var NRUPP = document.getElementById('NRUPP').getContext('2d');
var DAUPP = document.getElementById('DAUPP').getContext('2d');
var colors = ['#4B296B', '#074F57', '#F45866', '#077187', '#5D924F', '#E0A458', '#AEF78E'];

//chart config
Chart.defaults.Line.datasetFill = false;
Chart.defaults.Line.bezierCurve = false;

function generateLegendTpl (color, label) {
    return '<div class="legend-box" style="background-color: '+color+'">'+label+'</div>';
}

function prepareMultiLineChart(element, json, legend) {
    var hexMap = {};

    $.ajax(json).done(function(response) {
        var datasets = {};
        var datasetsArray = [];
        var labels = [];
        var hexI = 0;
        //format data
        for(var i = 0; i < response.length; i++) {
            delete response[i][""];
            for(property in response[i]) {
                if(!datasets[property]) { datasets[property] = []; }
                if(property === 'date') { labels.push(response[i][property]); }
                else { datasets[property].push(response[i][property]); }

                //generate the hex map
                if(!hexMap[property] && property !== 'date') { 
                    hexMap[property] = colors[hexI] 
                    hexI++;
                }
            }
        }

        //create dataset
        for(dataset in datasets) {
            datasetsArray.push({
                strokeColor : hexMap[dataset],
                pointColor: hexMap[dataset],
                pointStrokeColor : "#3cf",
                data : datasets[dataset]
            });
        }

        var realData = {
            labels : labels,
            datasets : datasetsArray
        };

        new Chart(element).Line(realData);
        
        for(label in hexMap) {
            $('#'+legend).append(generateLegendTpl(hexMap[label], label));
        }
    });
}

prepareMultiLineChart(NRU, 'outputData.json', 'NRU-legend');
prepareMultiLineChart(DAU, 'outputData.json', 'DAU-legend');
prepareMultiLineChart(NRUPP, 'outputData2.json', 'NRUPP-legend');
prepareMultiLineChart(DAUPP, 'outputData2.json', 'DAUPP-legend');