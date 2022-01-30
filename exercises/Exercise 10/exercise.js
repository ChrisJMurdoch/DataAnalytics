
let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';

// Define counting variables for each age range
let ageRanges = [
    {name:"1-30", events: 0, deaths: 0},
    {name:"31-40", events: 0, deaths: 0},
    {name:"41-60", events: 0, deaths: 0},
    {name:"61-100", events: 0, deaths: 0},
];
let events = [0, 0, 0, 0]; // Occurrence counter
let deaths = [0, 0, 0, 0]; // Death counter

// Calculate mortality rate as percentage
function mortalityRate(occurrences, deaths) {
    return (occurrences===0) ? 0 : Math.round(100*deaths/occurrences);
}

// Run function for each row in the data
d3.csv(heartfailurecsv, function(data) {

    // Increment relevant age range
    let age = parseInt(data.age);
    if (age<=30) {
        ageRanges[0].events++; // Increment occurrence counter
        ageRanges[0].deaths += parseInt(data.DEATH_EVENT); // Increment death counter
    } else if (age<=40) {
        ageRanges[1].events++;
        ageRanges[1].deaths += parseInt(data.DEATH_EVENT);
    } else if (age<=60) {
        ageRanges[2].events++;
        ageRanges[2].deaths += parseInt(data.DEATH_EVENT);
    } else if (age<=100) {
        ageRanges[3].events++;
        ageRanges[3].deaths += parseInt(data.DEATH_EVENT);
    }
    
// Display the age range data
}).then(function(data) {
    
    // This flag is used in other scripts to load the data without showing output
    if (typeof silent === 'undefined' || !silent) {
        d3.select("body").append("p").text(`Deaths in age range 1-30: ${ageRanges[0].events}.  Mortality rate: ${mortalityRate(ageRanges[0].events, ageRanges[0].deaths)}%.`);
        d3.select("body").append("p").text(`Deaths in age range 31-40: ${ageRanges[1].events}.  Mortality rate: ${mortalityRate(ageRanges[1].events, ageRanges[1].deaths)}%.`);
        d3.select("body").append("p").text(`Deaths in age range 41-60: ${ageRanges[2].events}.  Mortality rate: ${mortalityRate(ageRanges[2].events, ageRanges[2].deaths)}%.`);
        d3.select("body").append("p").text(`Deaths in age range 61-100: ${ageRanges[3].events}.  Mortality rate: ${mortalityRate(ageRanges[3].events, ageRanges[3].deaths)}%.`);
    }

    // Signal data loaded (used in Exercise 10)
    if (typeof(dataLoadedCallback)==="function")
        dataLoadedCallback(ageRanges);
});
