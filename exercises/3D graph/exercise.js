

// SVG dimensions
const outerWidth=500, outerHeight=220;
const padding = 40;
const innerWidth = outerWidth - padding;
const innerHeight = outerHeight - padding;
const depth = 100;

/**
 * Plot data on provided SVG, or plot data on newly-created SVG if not supplied
 * @param {Int32List} data X and Y coordinate array for line to plot
 * @param {String} colour CSS-style colour name
 * @param {d3::Svg} svg Optional SVG on which to render
 * @param {Int32} z z-index of plotted line (0 < z < 1)
 */
function plotLine(data, colour, svg=null, z=0) {

    // Create new SVG if not supplied
    if (svg===null) {

        // Create SVG
        svg = d3.select("body")
            .append("svg")
            .attr('width', outerWidth+depth)
            .attr('height', outerHeight+depth);
    }

    // Create inner render surface with padding
    let render = svg.append("g")
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr("transform", `translate(${padding+z*depth}, ${depth-z*depth})`);
    
    // Set the min and max of data
    let xExtent = [0, 1];
    let yExtent = [0, 3];
    let zExtent = [0, 1];

    // Create X and Y scales
    let x = d3.scaleLinear()
        .domain([ xExtent[0], xExtent[1] ])
        .range([0, innerWidth]);
    let y = d3.scaleLinear()
        .domain([ yExtent[0], yExtent[1] ])
        .range([innerHeight, 0]);
    let zS = d3.scaleLinear()
        .domain([ zExtent[0], zExtent[1] ])
        .range([innerHeight, 0]);

    // Create axes
    if (z===0) {
        render.append("g")
            .call(d3.axisLeft(y));
        let depthSq = Math.pow(depth, 2);
        let diagonal = Math.sqrt(depthSq+depthSq);
        render.append("g") // Z axis
            .attr("transform", `translate(${(depth/2)+(depth/2)}, ${(innerHeight-diagonal)+(depth/2)-10}) rotate(45) scale(${diagonal/innerHeight}, ${diagonal/innerHeight})`)
            .call(d3.axisLeft(zS));
        render.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x))
    }

    // Complete shape (for filling)
    data.push({x: xExtent[1], y: yExtent[0]});
    data.push({x: xExtent[0], y: yExtent[0]});
    data.push(data[0]);
    data.push({x: xExtent[0], y: yExtent[0]});

    // Plot line
    render.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colour)
        .attr("fill", "lightblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x( (d) => x(d.x) )
            .y( (d) => y(d.y) )
        );
    
    return svg;
}

// Create data points
const numPoints = 100;
let dataA=[], dataB=[];
for (let i = 0; i < numPoints; i++)
    dataA.push( {x: i/100, y: Math.sin( 6.2*i / 100 ) } );

// Plot data
const zLayers = 10;

// 
const sinWave = (t) => Math.sin( 2*Math.PI * (t-0.25) ) + 1;

// For each z-layer
var svg = null;
for (let i=0; i<zLayers; i++) {

    // Get layer as fraction between 0 and 1
    let lF = i/(zLayers-1);
    
    // Generate data for z-layer
    let zMultiplier = sinWave(lF);
    zMultiplier = (zMultiplier+1) / 2;
    console.log(lF, zMultiplier);
    let dataA=[], dataB=[];
    for (let j = 0; j < numPoints; j++)
        dataA.push( {x: j/100, y: sinWave(j/100) * zMultiplier } );
    
    // Render layer
    svg = plotLine(dataA, "blue", svg, 1-lF);
}
