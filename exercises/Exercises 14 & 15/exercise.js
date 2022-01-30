
// Suppress logs and DOM appends
let silent = true;

// Load Exercise 10 script
d3.select("body")
    .append("script")
    .attr("src", "../Exercise 10/exercise.js");

// Called when Exercise 10 script has finished loading the data
function dataLoadedCallback(data) {

    const width = 300;
    const rightMargin = 110;
    const leftMargin = 60;
    let max = 0;
    for (d of data)
        max = d.events>max ? d.events : max;
    const scaleFactor = (width-rightMargin) / max;
    const barHeight = 20;

    // Append title
    d3.select("body")
        .append("h3")
        .text("Heart failures per age range:")

    // Add SVG
    let graph = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", barHeight*data.length);
    
    // Enter new SVG groups
    let bars = graph.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(0, ${i*barHeight})` );
    
    // Add the bar
    bars.append("rect")
        .attr("x", leftMargin)
        .attr("width", (d) => d.events*scaleFactor + 1 ) // +1 so 0 bars can still be seen
        .attr("height", barHeight-1 )
        .style("fill", (d) => {

            // Calculate inverse of redness from data for green and blue values
            let redness = d.events/max;
            redness = Math.pow(redness, 5);
            redness *= 255;

            // Create RGB using redness values
            return `rgba(255,${255-redness},${255-redness},1)`;
        })
        .style("stroke", "blue");

    // Add numerical value to the right
    bars.append("text")
        .attr("x", (d) => d.events*scaleFactor+leftMargin+5 )
        .attr("y", barHeight/2 )
        .attr("dy", ".35em")
        .text( (d) => `${d.events}` );
    
    // Add data label to the left
    bars.append("text")
        .attr("x", 0 )
        .attr("y", barHeight/2 )
        .attr("dy", ".35em")
        .text( (d) => `${d.name}` );
}
