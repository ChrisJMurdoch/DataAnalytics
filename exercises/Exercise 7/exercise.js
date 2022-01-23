
let num = [10, 50, 100, 200];

let paragraph = d3.select("body")
    .selectAll("div")
    .data(num)
    .text(function (d, i) {
        return 'cont:' + d;
    })
    .style( "color", (d, i) => (d>=50 && d<=100) ? "red" : "yellow" )
    .style("background-color", "lightgray"); // Change background so yellow text is visible
