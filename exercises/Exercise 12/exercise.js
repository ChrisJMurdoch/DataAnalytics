
// Create SVG
var svg = d3.select("body")
.append("svg")
    .attr("width", 300)
    .attr("height", 300)
    .style("border", '1px solid green');

// Load each line of the scene CSV onto the page
d3.csv("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/scene.csv", function(data) {
    switch (data.shape) {
        case "rect":
            var shape = svg.append("rect")
                .attr("x", data.x).attr("y", data.y)
                .attr("width", data.width).attr("height", data.height);
            break;
        case "circle":
            var shape = svg.append("circle")
                .attr("cx", data.x).attr("cy", data.y)
                .attr("r", data.width);
            break;
        case "ellipse":
            var shape = svg.append("ellipse")
                .attr("cx", data.x).attr("cy", data.y)
                .attr("rx", data.width).attr("ry", data.height);
            break;
        case "text":
            var shape = svg.append("text")
                .attr("x", data.x).attr("y", data.y)
                .text(data.text);
            break;
        default:
            svg.append("p").text("Shape-parsing error.");
            return data;
    }
    shape.attr("stroke", data.stroke).attr("fill", data.fill);

    return data;
});
