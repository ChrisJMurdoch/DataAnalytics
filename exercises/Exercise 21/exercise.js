
/**
 * Take in the URL of a CSV file and display selected column as a bar chart
 * @param  {String} csvUrl URl of the CSV file to be loaded
 * @param  {String} columnName Name of the column to be displayed
 * @param  {Function} callback Called when async function finishes
*/
function displayCsvAsAxisBar(csvUrl, columnName, callback) {

    // Read in data from CSV
    d3.csv(csvUrl, function(data) {

        // Use data from the first column if no column is specified
        return parseInt( (typeof(columnName)==='undefined') ? data[Object.keys(data)[0]] : data[columnName] );

    // Use the data once loaded
    }).then(function(data) {

        // Set display dimensions
        const width = 500;
        const barHeight = 20;
        const margin = 1;
        const axisMargin = 25;

        // Create scale from data
        var scale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([50, width]);
        
        // Add SVG
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + axisMargin)
            .attr("height", barHeight*data.length + axisMargin);

        // Create SVG groups
        var g = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(10,${i*barHeight})`);

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
        
        // ===== EXERCISE 21 START =====

        // Create scale and axis
        let x_scale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([50, width]);
        let x_axis_bottom = d3.axisBottom().scale(x_scale);

        // Add and transform axis
        svg.append("g")
            .attr("transform", `translate(10, ${barHeight*data.length})`) // Move down by height
            .call(x_axis_bottom);

        // ===== EXERCISE 21 END =====

        // Call callback
        try {
            callback();
        } catch (e) {}
    })
}

// Call function the first time with callback
d3.select("body").append("h3").text("Part 9 data").style("margin-top", "0");
displayCsvAsAxisBar("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/part_nine_data_a.csv", "value", function() {

    // Call function the second time with no callback
    d3.select("body").append("h3").text("Part 6 scene data").style("margin-top", "0");
    displayCsvAsAxisBar("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/part_nine_data_b.csv", "value");
});
