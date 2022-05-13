const fetch = require('node-fetch'); // run "npm install node-fetch" to install
// const config = require('../config.js');

const getIPLocation = async () => {
  const IPRes = await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=543d55f0efd14c93921d13ad86bfdac9')
  const IPLocation = await IPRes.json()
  return IPLocation
}

module.exports = { IP: getIPLocation }
