
let titaniccsv = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv'; 

// Define counting/accumulation variables
let mr=0, male=0, maleAgeTotal=0, maleAgeCount=0;
let mrs=0, female=0, femaleAgeTotal=0, femaleAgeCount=0;

// Read the CSV
d3.csv(titaniccsv,

    // Run this function for each line in the dataset
    function(data) {

        // MR/MRS count
        mr += data.Name.includes("Mr.");
        mrs += data.Name.includes("Mrs.");

        // MALE/FEMALE count and average age accumulation
        if (data.Sex==="male") {
            male++;
            if (parseInt(data.Age)) {
                maleAgeCount++; // Add to occurrence counter if age exists
                maleAgeTotal += parseInt(data.Age); // Add to total if age exists
            }
        } else if (data.Sex==="female") {
            female++;
            if (parseInt(data.Age)) {
                femaleAgeCount++;
                femaleAgeTotal += parseInt(data.Age);
            }
        }

        // Return the data unmodified
        return data;
    }

// Run this function once finished reading the CSV
).then(function(d) {

    // Display the data on the page
    d3.select("body").append("p").text(`Mr: ${mr}, Mrs: ${mrs}.`);
    d3.select("body").append("p").text(`Male: ${male}, Female: ${female}.`);

    // Display calculated averages
    d3.select("body").append("p").text(`Avg male age: ${(maleAgeTotal/maleAgeCount).toPrecision(4)}, Avg female age: ${(femaleAgeTotal/femaleAgeCount).toPrecision(4)}`);
});
