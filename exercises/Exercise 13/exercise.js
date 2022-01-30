
// Define 7 circle centres
let circles = [ {x:10,y:10}, {x:200,y:200}, {x:100,y:150}, {x:200,y:100}, {x:100,y:250}, {x:250,y:50}, {x:200,y:150} ];

// Enter circles to make up 7 shapes
function enterSeven() {
    d3.select("svg")
        .selectAll("*")
        .data(circles)
        .enter()
        .append('circle')
        .attr("cx", (d, i) => d.x )
        .attr("cy", (d, i) => d.y )
        .attr("r", 10 )
        .attr("stroke", "blue")
        .attr("fill", "cyan");
}

// Define 5 values
let numbers = [1, 2, 3, 4, 5];

// Exit elements if more than 5
function exitFive() {
    d3.select("svg")
        .selectAll("*")
        .data(numbers)
        .exit()
        .remove();
}
