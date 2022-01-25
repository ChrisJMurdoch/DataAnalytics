
// Create SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300)
    .style("border", '1px solid green');

// Create square lines
svg.append("line")
    .attr("x1", 50).attr("y1", 50)
    .attr("x2", 250).attr("y2", 50)
    .attr("stroke", "red");
svg.append("line")
    .attr("x1", 250).attr("y1", 50)
    .attr("x2", 250).attr("y2", 250)
    .attr("stroke", "green");
svg.append("line")
    .attr("x1", 250).attr("y1", 250)
    .attr("x2", 50).attr("y2", 250)
    .attr("stroke", "blue");
svg.append("line")
    .attr("x1", 50).attr("y1", 250)
    .attr("x2", 50).attr("y2", 50)
    .attr("stroke", "purple");
