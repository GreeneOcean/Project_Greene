
const fetch = require('node-fetch'); // run "npm install node-fetch" to install


const IP_KEY = `543d55f0efd14c93921d13ad86bfdac9`

const getIPLocation = async () => {
  const IPRes = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${IP_KEY}`)
  const IPLocation = await IPRes.json()
  // console.log('Testing loc.IP()', { IPLocation })
  return IPLocation
}

// getIPLocation()

module.exports = { IP: getIPLocation }