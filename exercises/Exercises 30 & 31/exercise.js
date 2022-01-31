
// Data
var data = [3, 4, 17, 5, 8, 5, 6, 5, 6, 3, 4, 25, 5, 3, 5, 6];

// Display dimensions
const outerWidth=600, outerHeight=300;
const margin = 40;
const innerWidth = outerWidth - margin*2;
const innerHeight = outerHeight - margin*2;

// Create SVG and render surface
const render = d3.select("body")
    .append("svg")
    .attr('width', outerWidth )
    .attr('height', outerHeight )
    .append("g")
    .attr("transform",`translate(${outerWidth/2}, ${outerHeight/2})`);

// Generate the pie
let pie = d3.pie().sort(null);

// Generate the arcs
const radius = Math.min(outerWidth, outerHeight) / 2;
let arc = d3.arc()
    .innerRadius(radius/2)
    .outerRadius(radius);

// Draw arcs
let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3']);
let arcs = render.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .append("path")
    .attr("fill", (d, i) => color(i) )
    .attr("d", arc);

// Label arcs
render.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("text")
    .text( (d) => d.data )
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .attr("stroke", "white")
    .attr("fill", "white")
    .style("filter", "drop-shadow(0 0 3px rgba(0, 0, 0, 1))");
