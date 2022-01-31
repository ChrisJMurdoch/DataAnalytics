
/**
 * Take in the URL of a CSV file and display selected column as a bar chart with background image
 * @param  {String} csvUrl URl of the CSV file to be loaded
 * @param  {String} columnName Name of the column to be displayed
 * @param  {String} imgUrl URL of image to be displayed
*/
function displayCsvAsImgBar(csvUrl, columnName, imgUrl) {

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

        // ===== EXERCISE 32 START =====

        d3.select("body")
            .append("svg:image")
            .attr("xlink:href", imgUrl)
            .attr("width", 40)
            .attr("height", 40)
            .attr("x", 228)
            .attr("y",53);

        // ===== EXERCISE 32 END =====

        // Create scale from data
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

        // Call callback
        try {
            callback();
        } catch (e) {}
    })
}

// Call function the first time with callback
d3.select("body").append("h3").text("Part 9 data");
displayCsvAsImgBar(
    "https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/part_nine_data_a.csv",
    "value",
    "https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/tree.svg"
);
