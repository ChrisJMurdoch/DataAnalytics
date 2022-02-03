
// Display parameters
const samplesPerRender = 10000; // How many samples are run each render pass
const maxSamples = 10000 * samplesPerRender; // How many samples are allowed on screen at once

// Display size
const dimension=300;

// Create SVG
var svg = d3.select("body")
.append("svg")
    .attr("width", dimension)
    .attr("height", dimension);

// Create rectangle
svg.append("rect")
    .attr("x", 0).attr("y", 0)
    .attr("width", dimension).attr("height", dimension)
    .attr("stroke", "black").attr("fill", "none")
    .attr("stroke-width", 2);

// Create circle
svg.append("circle")
    .attr("cx", dimension/2).attr("cy", dimension/2)
    .attr("r", dimension/2)
    .attr("stroke", "black").attr("fill", "none")
    .attr("stroke-width", 1);

// Initialise sample data and add displays
let nSamples=0, sumSamples=0;
let div = d3.select("body")
    .append("div")
    .attr("id", "data_display")
    .style("width", "30%")
    .style("margin-left", "5%");

div.append("h4")
    .text("Approximation formula");
div.append("p")
    .text(`-`)
    .style("font-family", "monospace")
    .attr("id", "formula");
div.append("br");

div.append("h4")
    .text("Accuracy");
div.append("p")
    .text(`PI Real: \u00A0 ${Math.PI.toFixed(5)}`) // Fix to 5 digits after decimal place
    .style("font-family", "monospace");
div.append("p")
    .text(`PI Approx: -`)
    .style("font-family", "monospace")
    .attr("id", "pi_approx");
div.append("p")
    .text(`Accuracy: \u00A0-`)
    .style("font-family", "monospace")
    .attr("id", "accuracy");

// Add random sample to graph
function addSample() {

    // Randomise sample location between (0,0) and (1,1)
    let x=Math.random(), y=Math.random();

    // Check if in circle (radius < 0.5)
    let inCircle = Math.sqrt(Math.pow(x-0.5, 2)+Math.pow(y-0.5, 2)) < 0.5;

    // Draw point
    svg.append("circle")
        .attr("cx", x*dimension).attr("cy", y*dimension)
        .attr("r", 1.5)
        .attr("stroke", "none").attr("fill", inCircle ? "blue" : "red")
        .attr("class", "sample");
    
    // Remove old point
    if (nSamples>maxSamples)
        svg.select(".sample")
            .remove();
    
    // Calculate more samples than are being rendered
    for (let i=0; i<samplesPerRender; i++) {
        x=Math.random(), y=Math.random();
        inCircle = Math.sqrt(Math.pow(x-0.5, 2)+Math.pow(y-0.5, 2)) < 0.5;
        nSamples++;
        sumSamples += inCircle ? 1 : 0;
    }

    // Update approximation display
    let approx = sumSamples*4/nSamples;
    d3.select("#pi_approx")
        .text(`PI Approx: ${approx.toFixed(5)}`);

    // Update accuracy display
    let error = Math.abs(Math.PI-approx)/Math.PI; //  Normalised for (0 <= error <= 1) when approx < real
    let accuracy = (1-error)*100;
    d3.select("#accuracy")
        .text(`Accuracy: \u00A0${accuracy.toFixed(5)}%`);
    
    // Update formula display
    d3.select("#formula")
        .text(`${Math.floor(sumSamples/1000)}k (Samples in circle) * 4 / ${Math.floor(nSamples/1000)}k (Samples in square) = ${approx.toFixed(5)}`);
    
    // Schedule another call
    setTimeout(addSample, 0);
}

// Start sample loop
addSample();
