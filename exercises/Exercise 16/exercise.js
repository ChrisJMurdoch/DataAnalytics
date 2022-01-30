
const width = 550;
const height = 500;
const data = [10, 15, 20, 25, 30];

// Note different valid ways of specifying color
const colors = ['#ffffcc','red','rgb(0,255,0)','#31a354','#006837'];

// Set body colour
d3.select("body")
    .style("background-color", "lightgrey");

// Create the SVG
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create SVG groups
const g = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", "translate(0,0)");

// Add a variable-size square to perimeter
let squareScale = 3.5;
g.append("rect")
    .attr("x", (d, i) => (i*100 + 50) - (d*squareScale/2.0) )
    .attr("y", (d) => 220 - (d*squareScale/2.0) )
    .attr("width", (d) => d*squareScale )
    .attr("height", (d) => d*squareScale )
    .attr("fill", (d, i) => colors[i] )
    .attr("stroke", "black");

// Create a variable-radius circle
g.append("circle")
    .attr("cx", (d, i) => i*100 + 50 )
    .attr("cy", 100)
    .attr("r", (d) => d*1.5 )
    .attr("fill", (d, i) => colors[i] );

// Add a variable-size square to bottom corner
g.append("rect")
    .attr("x", (d, i) => i*100 + 50 )
    .attr("y", 100)
    .attr("width", (d) => d*1.5 )
    .attr("height", (d) => d*1.5 )
    .attr("fill", (d, i) => colors[i] );

// Display the data values
g.append("text")
    .attr("x", (d, i) => i*100 + 40 )
    .attr("y", 105)
    .attr("stroke", "teal")
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    .text( (d) => d );
