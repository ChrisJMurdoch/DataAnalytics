
// SVG dimensions
const outerWidth=600, outerHeight=300;
const padding = 40;
const innerWidth = outerWidth - padding*2;
const innerHeight = outerHeight - padding*2;

/**
 * Plot data on provided SVG, or plot data on newly-created SVG if not supplied
 * @param {Int32List} data X and Y coordinate array for line to plot
 * @param {String} colour CSS-style colour name
 * @param {Boolean} triangles render points as triangles instead of circles
 * @param {d3::Svg} svg Optional SVG on which to render
 * @param {String[{index, description}]} labels list of labels to render on graph
 */
function plotDottedLine(data, colour, triangles, svg=null, labels=[]) {

    // Create new SVG if not supplied
    if (svg===null) {

        // Create SVG
        var svg = d3.select("body")
            .append("svg")
            .attr('width', outerWidth)
            .attr('height', outerHeight);
        
        // Create inner render surface with padding
        svg.append("g")
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr("transform", `translate(${padding}, ${padding})`);
    }

    // Get render surface
    let render = svg.select("g");

    // Get the min and max of data in one pass
    let xExtent = d3.extent( data, (d) => d.x );
    let yExtent = d3.extent( data, (d) => d.y );

    // Create X and Y scales
    let x = d3.scaleLinear()
        .domain([ xExtent[0], xExtent[1] ])
        .range([0, innerWidth]);
    let y = d3.scaleLinear()
        .domain([ yExtent[0], yExtent[1] ])
        .range([innerHeight, 0]);

    // Create axes
    render.append("g")
        .call(d3.axisTop(x));
    render.append("g")
        .call(d3.axisLeft(y));
    render.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x))
    render.append("g")
        .attr("transform", `translate(${innerWidth}, 0)`)
        .call(d3.axisRight(y));

    // Plot line
    render.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colour)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x( (d) => x(d.x) )
            .y( (d) => y(d.y) )
        );
    
    // ===== EXERCISES 25, 26 & 27 START =====

    // Add points
    let tri = d3.symbol().type(d3.symbolTriangle).size(30);
    if (triangles) {
        render.selectAll("dot")
            .data(data)
            .enter()
            .append("path")
            .attr("d", tri)
            .attr("transform", (d) => `translate(${x(d.x)}, ${y(d.y)})`)
            .style("fill", colour);
    } else {
        render.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(d.x) )
            .attr("cy", (d) => y(d.y) )
            .attr("r", 3)
            .style("fill", colour);
    }

    // Label points
    const xOffset = 0;
    for (label of labels) {
        console.log(x(data[label].x), y(data[label].y));
        render.append("text")
            .text( (data[label].y).toFixed(2) )
            .attr("x", x(data[label].x)+xOffset)
            .attr("y", y(data[label].y))
            .style("font-weight", "bold");
    }

    // ===== EXERCISES 25, 26 & 27 END =====

    return svg;
}

// Used to suppress output in later exercises
if ( typeof(E25_FUNCTION_ONLY)==="undefined" || E25_FUNCTION_ONLY===false ) {

    // Create data points
    const numPoints = 40;
    let dataA=[], dataB=[];
    for (let i = 0; i < numPoints; i++) {
        dataA.push( {x: i/100, y: Math.sin( 20*i / 100 ) } );
        dataB.push( {x: i/100, y: Math.cos( 20*i / 100 ) } );
    }

    // Plot data
    let labels = [14, 22, 27];
    let svgA = plotDottedLine(dataA, "blue", false, null, labels);
    plotDottedLine(dataB, "red", true, svgA, labels);
}

// Used to signal load finished in later exercises
if ( typeof(E25_LOADED_CALLBACK)==="function" )
    E25_LOADED_CALLBACK();
