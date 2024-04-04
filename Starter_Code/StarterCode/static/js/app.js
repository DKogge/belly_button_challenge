// website variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
let data;
// data promise
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// get JSON and set up dropdown default to the first option
d3.json(url).then(function(response) {
    data = response;
    let names = data.names;
    let dropdownEL = d3.select("#selDataset");
    names.forEach(name => {
        dropdownEL.append("option").text(name)
    });
    optionChanged(names[0])
    console.log(data);
});

// functions when drop down changes
function optionChanged(id) {
    bar(id);
    // bubble(id);
    // pair(id);
}

// horizontal bar chart need to sort the data and get this to work
function bar(id) {
    let sample = data.samples.find(s=> s.id==id);
    // console.log(sample);
    var barData = [{
        type: 'bar',
        x: [1,2,3],
        y: ["red", "blue", "green"],
        orientation: 'h'
      }];
      Plotly.newPlot('bar', barData);
    console.log(id);
}


// bubble chart
function bubble(id) {
    let sample = data.samples.find(s=> s.id==id);

    // var trace1 = {
    //     x: [1, 2, 3, ],
    //     y: ["red", "blue", "green"],
    //     mode: 'markers',
    //     marker: {
    //       size: [40, 60, 80, 100]
    //     }
    //   };
      
    //   var data = [trace1];
      
    //   var layout = {
    //     title: 'Marker Size',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    //   };
      
    //   Plotly.newPlot("bubble", data, layout);
    console.log(id);
}

// metadata pairs
function pair(id) {
    let mD = data.metadata.find(s=> s.id==id);
    
    console.log(id);
}

// GitHub pages