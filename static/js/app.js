// website variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
let data;
// data promise
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// get JSON and set up dropdown default to the first option
d3.json(url).then(function(response) {
    data = response;
    let names = data.names;
    let dropdownEL = d3.select("#selDataset");
    names.forEach(name => {
        dropdownEL.append("option").text(name).attr("value", name);
    });
    optionChanged(names[0])
    // console.log(data);
});


function getSubjectData(id, dataArray) {
    let subjectData = dataArray.find(s=> s.id==id);
    return subjectData;
} 


// functions when drop down changes
function optionChanged(id) {
    let subjectSamples = getSubjectData(id, data.samples);
    let subjectMetaData = getSubjectData(id, data.metadata);
    bar(subjectSamples);
    bubble(subjectSamples);
    pair(subjectMetaData);
}

// horizontal bar chart need to sort the data and get this to work
function bar(sample) {
    // console.log(sample);
    let values = sample.sample_values.slice(0, 10).reverse();
    let otus = sample.otu_ids.slice(0, 10).reverse().map(otu => `OTU ${otu}`);
    let labels = sample.otu_labels.slice(0, 10).reverse();
    console.log(values);
    var barData = [{
        type: 'bar',
        x: values,
        y: otus,
        text: labels,
        orientation: 'h'
      }];
      Plotly.newPlot('bar', barData);
}


// bubble chart
function bubble(sample) {

    var trace1 = { 
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        text: sample.otu_labels,
        marker: {
          size: sample.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot("bubble", data, layout);
    console.log(sample);
}

// metadata pairs
function pair(info) {
    
    console.log(info);
    console.log(info["id"])
    let table = d3.select("#sample-metadata");
    table.html("");
    for (key in info) {
        table.append("h6").text(`${key.toUpperCase()} : ${info[key]}`);
    }
    
}


// GitHub pages