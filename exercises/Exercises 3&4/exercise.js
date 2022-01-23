
// Select the body element
let body = d3.select("body");

// Loop from 1 to 10
for (let i=1; i<=10; i++) {

    // Append a numbered div
    body.append("div")
        .text(`${i}`)
        .style("color", i<=5 ? "red" : "green"); // Colour the div conditionally
}

// Edit the first div in the document
d3.select("div")
    .text("start")
    .style("color", "purple");
