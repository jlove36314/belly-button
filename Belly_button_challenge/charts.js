function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });



    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var chosenPerson = data.samples;
    

      
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = chosenPerson.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
     //{console.log(key + ': ' + value);};
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuId = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    console.log(otuId);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuId.slice(0,10).map(OTU => "OTU " + OTU ).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: 'h',
      text: otuLabels.slice(0,10).reverse()
    };

    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Belly Button Bacteria"
      
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

      //**Bubble charts*//

        // 1. Create the trace for the bubble chart.
        var bubbleData = {
          x: otuId,
          y: sampleValues,
          mode: 'markers',
          hovertext: otuLabels,
          marker: {
            color: otuId,
            size: sampleValues,
            colorscale: "Picnic"
          }
        };

    var trace2 = [bubbleData];

        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
          title: "Belly Button Bacteria",
          xaxis: {title: "IDs"},
          hovermode: 'closest',
    };
        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot('bubble', trace2, bubbleLayout);
          
        
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