// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot(); 
  });
}
  //**Gauge Chart */

// 3. Create a variable that holds the washing frequency.
var metadata = data.metadata;
var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
var result = resultArray[0];
var washingFreq = result.wfreq;


// 4. Create the trace for the gauge chart.
var gaugeData =  {
  type: "indicator",
 value: washingFreq,
 title: {text: "Belly Button Washing Frequency <br> Scrubs per Week"},
 mode: "gauge+number",
 delta: {reference: 380},
 gauge: {
   axis: {range: [0,10], tickwidth: 2, tickcolor: "black"},
   steps: [
     {range: [0,2], color: 'red'},
     {range: [2,4], color: 'orange'},
     {range: [4,6], color: 'yellow'},
     {range: [6,8], color: 'blue'},
     {range: [8,10], color: 'green'}
   ],
 }
}
var trace3 = [gaugeData];


// 5. Create the layout for the gauge chart.
var gaugeLayout = { 
  width: 475, height: 400, margin: {t:0, b: 0}
};

Plotly.newPlot('gauge', trace3, gaugeLayout);
});
};
