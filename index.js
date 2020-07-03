const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
// const { nextISSTimesForMyLocation } = require('./iss');


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
      nextISSTimesForMyLocation(data);

    }); // fetch PassTimes

  }); // fetch Coords
  
}); // fetch IP
