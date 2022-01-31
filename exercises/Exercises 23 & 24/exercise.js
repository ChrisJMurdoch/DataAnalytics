
// Load function from exercise 22
const E22_FUNCTION_ONLY = true;
d3.select("body")
    .append("script")
    .attr("src", "../Exercise 22/exercise.js");

// Wait for function to be loaded
function E22_LOADED_CALLBACK() {

    // Insert file locations into absolute URL
    const repo = (name) => `https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/data/${name}.csv`;

    // Save SVG generated from first plot
    let svg;

    // Draw first line
    d3.csv(
        repo("part_12_line_a"),
        (d, i) => ({x:i, y:parseInt(d.value)})
    ).then(
        (data) => svg = plotLine(data, "blue")
    );
    
    // Draw second line
    d3.csv(
        repo("part_12_line_b"),
        (d, i) => ({x:i, y:parseInt(d.value)})
    ).then(
        (data) => plotLine(data, "red", svg)
    );
}
