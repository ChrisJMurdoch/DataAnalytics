
let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';

let a30=0, a40=0, a60=0, a100=0;
d3.csv(heartfailurecsv, function(data) {
    let age = parseInt(data.age);
    if (age<=30)
        a30++;
    else if (age<=40)
        a40++;
    else if (age<=60)
        a60++;
    else if (age<=100)
        a100++;
}).then(function(data) {
    console.log(a30, a40, a60, a100);
});
