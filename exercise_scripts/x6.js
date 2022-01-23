
let otherdata = [
    {name:'test', val:1, color:"red"},
    {name:'other', val:2, color:"green"}, 
    {name:'b', val:3, color:"blue"}
];

d3.select("#x6")
    .selectAll("div")
    .data(otherdata)
    .text(function (d, i) {
        return 'cont:' + d.name;
    })
    .style("color", function(d, i) {
        return d.color;
    });
