
let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';

// Define counting variables for each age range
let a30=0, a40=0, a60=0, a100=0; // Occurrence counter
let d30=0, d40=0, d60=0, d100=0; // Death counter

// Run function for each row in the data
d3.csv(heartfailurecsv, function(data) {

    // Increment relevant age range
    let age = parseInt(data.age);
    if (age<=30) {
        a30++; // Increment occurrence counter
        d30 += parseInt(data.DEATH_EVENT); // Increment death counter
    } else if (age<=40) {
        a40++;
        d40 += parseInt(data.DEATH_EVENT);
    } else if (age<=60) {
        a60++;
        d60 += parseInt(data.DEATH_EVENT);
    } else if (age<=100) {
        a100++;
        d100 += parseInt(data.DEATH_EVENT);
    }
    
// Display the age range data
}).then(function(data) {
    console.log(a30, a40, a60, a100);
    d3.select("body").append("p").text(`Deaths in age range 1-30: ${a30}.  Mortality rate: ${mortalityRate(a30, d30)}%.`);
    d3.select("body").append("p").text(`Deaths in age range 31-40: ${a40}.  Mortality rate: ${mortalityRate(a40, d40)}%.`);
    d3.select("body").append("p").text(`Deaths in age range 41-60: ${a60}.  Mortality rate: ${mortalityRate(a60, d60)}%.`);
    d3.select("body").append("p").text(`Deaths in age range 61-100: ${a100}.  Mortality rate: ${mortalityRate(a100, d100)}%.`);
});

function mortalityRate(occurrences, deaths) {
    return (occurrences===0) ? 0 : Math.round(100*deaths/occurrences);
}
