const requestPromise = require('request-promise-native');

const fetchMyIP = function () {
  return requestPromise('https://api.ipify.org/?format=json')
}

const fetchCoordsByIP = function(ip) {
  return requestPromise(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(coords) {
  const lat = coords.latitude;
  const long = coords.longitude
  return requestPromise(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`)
}

const nextISSTimesForMyLocationPromise = function() {
  return fetchMyIP()
  .then((ip) => {
    const IPAddress = JSON.parse(ip).ip;
    return fetchCoordsByIP(IPAddress)
  })
  .then((coords) => {
    const obj = JSON.parse(coords);
    const latitude = obj.data.latitude;
    const longitude = obj.data.longitude
    return fetchISSFlyOverTimes({latitude, longitude})
  })
  .then((data) => {
    const { response } = JSON.parse(data);
    // console.log("here are the pass times:", response)
    return response;
  });
}

// const nextISSTimesForMyLocationPromise = function() {
//   return fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then((data) => {
//       const { response } = JSON.parse(data);
//       return response;
//     });
// };


module.exports = { nextISSTimesForMyLocationPromise};