
d3.select("body")
    .append("h3")
    .text("Source Code");

d3.select("body")
    .append("p")
    .text("The source code for this site and the contained exercises are source controlled and available to view at ")
    .append("a")
    .text("https://github.com/ChrisJMurdoch/DataAnalytics")
    .attr("href", "https://github.com/ChrisJMurdoch/DataAnalytics");

d3.select("body")
    .append("br");

d3.select("body")
    .append("h3")
    .text("Live Site");

d3.select("body")
    .append("p")
    .text("The site can be run locally when cloned, but is also hosted as a GitHub Pages site at ")
    .append("a")
    .text("https://chrisjmurdoch.github.io/DataAnalytics")
    .attr("href", "https://chrisjmurdoch.github.io/DataAnalytics");
