const { nextISSTimesForMyLocationPromise } = require('./iss_promised');
const { printPassTimes } = require('./index');


nextISSTimesForMyLocationPromise()
  .then((passTimes) => {
    // console.log("These are the PassTime:",passTimes);
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });