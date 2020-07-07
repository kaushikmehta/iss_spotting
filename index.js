const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
// const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  // console.log("ip is:", ip)
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    // console.log("Coords are:", data)
    
    fetchISSFlyOverTimes({ latitude: data.latitude, longitude: data.longitude}, (error, data) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      } 
      // console.log("PassTime Object is", data)
      // nextISSTimesForMyLocation(data);

    }); // fetch PassTimes

  }); // fetch Coords
  
}); // fetch IP

module.exports = { printPassTimes }