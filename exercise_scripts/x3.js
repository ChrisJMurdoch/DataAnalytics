
let x3 = d3.select("#x3");
for (let i=1; i<=10; i++)
    x3.append("div")
        .attr("id", `x3_${i}`)
        .text(`${i}`)
        .style("color", i<=5 ? "red" : "green");
