
// Create SVG
var svg = d3.select("body")
.append("svg")
    .attr("width", 300)
    .attr("height", 300)
    .style("border", '1px solid green');

// Load each line of the scene CSV onto the page
d3.csv("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/scene.csv", function(data) {
    switch (data.shape) {

        // Create rectangle
        case "rect":
            var shape = svg.append("rect")
                .attr("x", data.x).attr("y", data.y)
                .attr("width", data.width).attr("height", data.height);
            break;

        // Create circle
        case "circle":
            var shape = svg.append("circle")
                .attr("cx", data.x).attr("cy", data.y)
                .attr("r", data.width);
            break;
            
        // Create ellipse
        case "ellipse":
            var shape = svg.append("ellipse")
                .attr("cx", data.x).attr("cy", data.y)
                .attr("rx", data.width).attr("ry", data.height);
            break;
            
        // Create text
        case "text":
            var shape = svg.append("text")
                .attr("x", data.x).attr("y", data.y)
                .text(data.text);
            break;
        
        // Display error
        default:
            svg.append("p").text("Shape-parsing error.");
            return data;
    }

    // Set colours (same for all shapes)
    shape.attr("stroke", data.stroke).attr("fill", data.fill);

    return data;
});
