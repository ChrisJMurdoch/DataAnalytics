
// Create array of objects
let otherdata = [
    {name:'test', val:1, color:"red"},
    {name:'other', val:2, color:"green"}, 
    {name:'b', val:3, color:"blue"}
];

d3.select("body")
    .selectAll("div")
    .data(otherdata)
    .text(function (d, i) { // Dynamically add the text
        return 'cont: ' + d.name;
    })
    .style("color", function(d, i) { // Dynamically style
        return d.color;
    });
