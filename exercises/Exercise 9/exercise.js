
let titaniccsv = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv'; 

let mr=0, male=0, maleAgeTotal=0, maleAgeCount=0;
let mrs=0, female=0, femaleAgeTotal=0, femaleAgeCount=0;
d3.csv(titaniccsv, function(data) {
    mr += data.Name.includes("Mr.");
    mrs += data.Name.includes("Mrs.");
    if (data.Sex==="male") {
        male++;
        if (parseInt(data.Age)) {
            maleAgeCount++;
            maleAgeTotal += parseInt(data.Age);
        }
    } else if (data.Sex==="female") {
        female++;
        if (parseInt(data.Age)) {
            femaleAgeCount++;
            femaleAgeTotal += parseInt(data.Age);
        }
    }
}).then(function(d) {
    d3.select("body").append("p").text(`Mr: ${mr}, Mrs: ${mrs}.`);
    d3.select("body").append("p").text(`Male: ${male}, Female: ${female}.`);
    d3.select("body").append("p").text(`Avg male age: ${(maleAgeTotal/maleAgeCount).toPrecision(4)}, Avg female age: ${(femaleAgeTotal/femaleAgeCount).toPrecision(4)}`);
});
