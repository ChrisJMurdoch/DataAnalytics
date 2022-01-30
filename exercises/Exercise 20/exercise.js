
// Graph dimensions
const width = 400;
const height = 300;

var data = [10, 15, 20, 25, 30];

// Create SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Generate X and Y scales from data
var x_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width-100]);
var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height-100, 0]);

// Create axes
var y_axis_left = d3.axisLeft().scale(y_scale);
var x_axis_top = d3.axisTop().scale(x_scale);
var y_axis_right = d3.axisRight().scale(y_scale);
var x_axis_bottom = d3.axisBottom().scale(x_scale);

// Add axis groups
svg.append("g")
    .attr("transform", "translate(50, 50)")
    .call(y_axis_left);
svg.append("g")
    .attr("transform", `translate(50, 50)`)
    .call(x_axis_top)
    .attr("color", "blue"); // Colour blue
svg.append("g")
    .attr("transform", `translate(${width-50}, 50)`) // Move left by width
    .call(y_axis_right)
    .attr("color", "blue"); // Colour blue
svg.append("g")
    .attr("transform", `translate(50, ${height-50})`) // Move down by height
    .call(x_axis_bottom);
