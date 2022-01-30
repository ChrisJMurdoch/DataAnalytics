
// Populate the menu with a section header and buttons that link to their respective URLs
function populateMenu(section, exercises) {
    let div = d3.select("#menu").append("div");
    div.append("h3").text(`${section}`);
    for (exercise of exercises)
        div.append("button").attr("onclick", `switchExercise("${exercise}");`).text(`${exercise}`);
}

// Switch the actively-displayed exercise
function switchExercise(name) {

    // Exercise title
    d3.select("#exercise_title").text(`${name}`);

    // Exercise output
    d3.select("#display").attr("src", `./exercises/${name}/exercise.html`);

    // Load exercise code into Prism.js box
    fetch(`https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalytics/master/exercises/${name}/exercise.js`)
        .then(response => response.text())
        .then( function(text) {
            d3.select("#code_inner").text( text );
            Prism.highlightAll(); // Re-render Prism.js code
        });
}
