
const locationLogs = false


const promisifiedGeo = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((pos) => res(pos), (error) => {
      let errorStr;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorStr = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorStr = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorStr = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          errorStr = 'An unknown error occurred.';
          break;
        default:
          errorStr = 'An unknown error occurred.';
      }
      locationLogs && console.error('Error occurred: ' + errorStr);
      locationLogs && console.log(`Attempting location fetch by IP`)
      rej(false)
    })
  })
}


export function getLocation() {
  if (navigator.geolocation) {
    return promisifiedGeo()
      .then(res => {
        const { coords } = res
        return { lat: coords.latitude, lng: coords.longitude }
      })
      .catch(err => {
        locationLogs && console.log(`Geo location err ${err.message}`)
        return locationByIp()
      })

  } else {
    return locationByIp()
  }
}



export function locationByIp() {
  locationLogs && console.log(`Fetcing location by IP`)
  if (process.env.IP_KEY) {
    return fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.IP_KEY}`)
    .then(resp => resp.json())
    .then((userLocationData) => {
      locationLogs && console.log({userLocationData});
      const { location } = userLocationData
      return { lat: location.latitude, lng: location.longitude  }
    })
    .catch(err => locationLogs && console.log(`IP location fetch err ${err.message}`))
  }
  else {
    return new Promise((res, rej) => res({
      lat: 30.281785180813568,
      lng: -97.9005011705492,
    }))
  }
}
