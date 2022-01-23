
let myData = ['a', 4, 1, 'b', 6, 2, 8, 9, 'z' ];

let p = d3.select("body")
    .selectAll("p")
    .data(myData)
    .enter()
    .append('span')
    .text(function (d, i) {
        return d;
    })
    .style("color", function(d, i) {
        return typeof(d)==="string" ? "blue" : "green";
    });
