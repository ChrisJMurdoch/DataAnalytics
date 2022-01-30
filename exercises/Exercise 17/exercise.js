
const url = "https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/part_nine_data.csv";

// Read in data from CSV
d3.csv(url).then(function(data) {
        
    const data = [50, 400, 300, 900, 250, 1000]
    const width = 500;
    const barHeight = 20;
    const margin = 1;

    // Create scale
    var scale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([50, 500]);

    // Add SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    // Create SVG groups
    var g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(0,${i*barHeight})`);

    // Create coloured bar
    g.append("rect")
        .attr("width", (d) => scale(d) )
        .attr('fill', (d) => d<100 ? 'green' : d>500 ? 'red' : 'yellow' ) // Switch colour based on unscaled value
        .attr("height", barHeight - margin)

    // Display data values
    g.append("text")
        .attr("x", (d) => scale(d) )
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .style('text-anchor', 'end')
        .text( (d) => d );
})
