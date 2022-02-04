
// Create data
let myData = ['a', 4, 1, 'b', 6, 2, 8, 9, 'z' ];

let p = d3.select("body")
    .selectAll("p")
    .data(myData) // Bind the data
    .enter()
    .append('span')
    .text(function (d, i) {
        return d;
    })
    .style("color", function(d, i) { // Use data to colour element
        return typeof(d)==="string" ? "blue" : "green";
    });
