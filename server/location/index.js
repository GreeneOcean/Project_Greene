
<<<<<<< HEAD
const fetch = require('node-fetch'); // run "npm install node-fetch@2.0" to install
=======
const fetch = require('node-fetch'); // run "npm install node-fetch" to install
const config = require('../config.js');
>>>>>>> b951756817f7382fe1559e3f91d2496f06cf0ed5


const getIPLocation = async () => {
  const IPRes = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=543d55f0efd14c93921d13ad86bfdac9`)
  const IPLocation = await IPRes.json()
  return IPLocation
}


module.exports = { IP: getIPLocation }
