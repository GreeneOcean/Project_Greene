

const randInt = (max, type = 'floor') => {
  if (type === 'floor') {
    return Math.floor(Math.random() * max)
  }
  if (type === 'ceil') {
    return Math.ceil(Math.random() * max)
  }
  if (type === 'round') {
    return Math.round(Math.random() * max)
  }
  return Math.random() * max
}








// DONATION table
// title TEXT NOT NULL,
const titles = ['this probably doenst match', 'chinos', 'My old things', 'LIKE NEW']
// description TEXT NOT NULL,
const descriptions = ['even cooler', 'super cool', 'Just need to get rid of', 'Regifted ughhh']
// category TEXT NOT NULL,
const categorys = ['toy', 'shoes', 'Pants', 'Shirt', 'Jumpa', 'Undies o_o', 'Jacket']
// tag TEXT NOT NULL,
const tags = ['charity', 'individual']

const claimableLengths = {
  titlesL: titles.length,
  descriptionsL: descriptions.length,
  categorysL: categorys.length,
  tagsL: tags.length,
}



// const genRandDonation = (numClaim) => {
//   const { titlesL, descriptionsL, categorysL, tagsL, locationsL, } = claimableLengths
//   return {
//     title: titles[( randInt(titlesL) )],
//     description: descriptions[( randInt(descriptionsL) )],
//     category: categorys[( randInt(categorysL) )],
//     tag: [ tags[( randInt(tagsL) )] ],
//     charity_only: !!randInt(1, 'round'),
//     lat: genRandFromRange(lats),
//     lng: genRandFromRange(lngs),
//   }
// }





// USERS table
// firstName TEXT NOT NULL,
const firstNames = ['Tim', 'Sam', 'Reyna', 'Gary', 'Melanie', 'Hal', 'Old English Aristocrat', 'Simi', 'Jenna', 'Serena']
// lastName TEXT NOT NULL,
const lastNames = ['Smith', 'Sampson', 'Shmo', 'Teller', 'Frank', 'Grump', 'Glurp', 'Christianson?']
// userName TEXT NOT NULL,
const userNameFrags = ['cool', 'Guy', 'Girl', 'chill', '3', '5', '2', '6', 'take', 'my', 'clothes', 'shits', 'lol']


// Mark Alperin  4:48 PM
// NE: lat: 30.5491288, lng: -97.5811418
// NW: lat: 30.5491288, lng: -97.9111418
// SW: lat: 30.1491288, lng: -97.9111418
// SE: lat: 30.1491288, lng: -97.5811418

// const lats = [31, 47]
// const lngs = [-69, -120]

const lats = [30.1491288, 30.5491288]
const lngs = [-97.5811418, -97.9111418]

const userLengths = {
  firstNamesL: firstNames.length,
  lastNamesL: lastNames.length,
  userNameFragsL: userNameFrags.length,
}



const genRandFromRange = (range) => {
  const dif = range[1] - range[0]
  return range[0] + (dif * Math.random())
}


const genRandUserName = (maxNumberOfFrags = 5) => {
  const { userNameFragsL } = userLengths
  let numOfFrags = randInt(maxNumberOfFrags, 'ceil')
  let newUserName = ''
  while (numOfFrags--) {
    newUserName += userNameFrags[( randInt(userNameFragsL) )]
  }
  return newUserName
}

const maxInterests = 5;
const genRandInterests = (numClaimables) => {
  let numInterests = randInt(maxInterests, 'ceil')
  let newInterests = []
  while (numInterests--) {
    newInterests.push( randInt(numClaimables, 'round') )
  }
  return newInterests
}







const genRandDonationForUser = (userId, lat, lng) => {
  const { titlesL, descriptionsL, categorysL, tagsL, locationsL, } = claimableLengths
  return {
    posted_by: userId,
    title: titles[( randInt(titlesL) )],
    description: descriptions[( randInt(descriptionsL) )],
    category: categorys[( randInt(categorysL) )],
    tag: [ tags[( randInt(tagsL) )] ],
    charity_only: !!randInt(1, 'round'),
    interested: [],
    lat,
    lng,
  }
}



const genRandDonatedForUser = (userId, lat, lng) => {
  const { titlesL, descriptionsL, categorysL, tagsL, locationsL, } = claimableLengths
  return {
    posted_by: userId,
    title: titles[( randInt(titlesL) )],
    description: descriptions[( randInt(descriptionsL) )],
    category: categorys[( randInt(categorysL) )],
    tag: [ tags[( randInt(tagsL) )] ],
    charity_only: !!randInt(1, 'round'),
    lat,
    lng,
  }
}







const allDonations = []
const allDonated = []

let currentDonations = []
let currentDonated = []

const genRandUser = (id, donoRange = 5, donatedRange = 3) => {
  const { firstNamesL, lastNamesL, userNameFragsL, locationsL, } = userLengths
  const lat = genRandFromRange(lats)
  const lng = genRandFromRange(lngs)

  const numDonations = randInt(donoRange, 'round')
  const newDonos = []
  while (numDonations > newDonos.length) {
    const newDono = genRandDonationForUser(id, lat, lng)
    currentDonations.push(newDono)
    allDonations.push(newDono)
    newDonos.push( allDonations.length )
  }

  const numDonated = randInt(donatedRange, 'round')
  const newDonateds = []
  while (numDonated > newDonateds.length) {
    const newDonated = genRandDonatedForUser(id, lat, lng)
    currentDonated.push(newDonated)
    allDonated.push(newDonated)
    newDonateds.push( allDonated.length )
  }



  return {
    first_name: firstNames[( randInt(firstNamesL) )],
    last_name: lastNames[( randInt(lastNamesL) )],
    user_name: genRandUserName(),
    lat,
    lng,
    is_charity: !(!!randInt(5, 'round')),
    interests: [],
    received: [],
    donated: newDonateds,
    donations: newDonos,
    rating: randInt(10, 'round'),
  }
}







const genAll = (numUsers, currentUsers, donoRange, donatedRange) => {

  const data = { users: [], donations: [], donated: [] }
  let i = 0;

  while (numUsers > i) {
    i++
    data.users.push(genRandUser(i + currentUsers, donoRange, donatedRange))
  }

  data.donations = currentDonations
  data.donated = currentDonated
  currentDonations = []
  currentDonated = []
  return data

}


module.exports.all = genAll









// const genRandUserConnected = () => {
//   const { firstNamesL, lastNamesL, userNameFragsL, locationsL, } = userLengths
//   const lat = genRandFromRange(lats)
//   const lng = genRandFromRange(lngs)
//   return {
//     first_name: firstNames[( randInt(firstNamesL) )],
//     last_name: lastNames[( randInt(lastNamesL) )],
//     user_name: genRandUserName(),
//     lat,
//     lng,
//     is_charity: !(!!randInt(5, 'round')),
//     interests genRandInterests(numClaimables),
//     received INT[],
//     donated INT[],
//     donations INT[],
//     rating: randInt(10, 'dec')
//   }
// }
