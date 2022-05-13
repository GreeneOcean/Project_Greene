const { randInt } = require("./utilities.js");
const auth = require("../auth/index");

// DONATION table
// title TEXT NOT NULL,
const titles = [
  "this probably doenst match",
  "chinos",
  "My old things",
  "LIKE NEW"
];
// description TEXT NOT NULL,
const descriptions = [
  "even cooler",
  "super cool",
  "Just need to get rid of",
  "Regifted ughhh"
];
// category TEXT NOT NULL,
const categories = [
  "Accessories",
  "Arts & Crafts",
  "Baby",
  "Books",
  "Clothing",
  "Education",
  "Electronics",
  "Food",
  "Garden",
  "Home & Furniture",
  "Jewelry",
  "Kitchenware",
  "Movies",
  "Music",
  "Musical Instruments",
  "Office & Stationery",
  "Personal Care",
  "Pet Supplies",
  "Sports",
  "Tools",
  "Toys",
  "Video Games",
  "Other"
];
// tag TEXT NOT NULL,
const tags = ["charity", "individual"];

const claimableLengths = {
  titlesL: titles.length,
  descriptionsL: descriptions.length,
  categoriesL: categories.length,
  tagsL: tags.length
};

// USERS table
// firstName TEXT NOT NULL,
const firstNames = [
  "Tim",
  "Sam",
  "Reyna",
  "Gary",
  "Melanie",
  "Hal",
  "Old English Aristocrat",
  "Simi",
  "Jenna",
  "Serena"
];
// lastName TEXT NOT NULL,
const lastNames = [
  "Smith",
  "Sampson",
  "Shmo",
  "Teller",
  "Frank",
  "Grump",
  "Glurp",
  "Christianson?"
];
// userName TEXT NOT NULL,
const userNameFrags = [
  "cool",
  "guy",
  "girl",
  "chill",
  "3",
  "5",
  "2",
  "6",
  "take",
  "my",
  "clothes",
  "shirts",
  "lol",
  "mgee",
  "this",
  "is",
  "to",
  "prove",
  "steph",
  "wrong",
  "she",
  "is",
  "not",
  "even",
  "looking",
  "im"
];

const photos = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6V_R6WMnHzN5bpexR-vQ1tNickx9phBGTHA&usqp=CAU"
];
const charity_states = ["true", "false", "pending", "denied"];

// Mark Alperin  4:48 PM
// NE: lat: 30.5491288, lng: -97.5811418
// NW: lat: 30.5491288, lng: -97.9111418
// SW: lat: 30.1491288, lng: -97.9111418
// SE: lat: 30.1491288, lng: -97.5811418

// const lats = [31, 47]
// const lngs = [-69, -120]

const lats = [30.1491288, 30.5491288];
const lngs = [-97.5811418, -97.9111418];

const userLengths = {
  firstNamesL: firstNames.length,
  lastNamesL: lastNames.length,
  userNameFragsL: userNameFrags.length
};

const genRandFromRange = (range) => {
  const dif = range[1] - range[0];
  return range[0] + dif * Math.random();
};

var createdNames = [];

const genRandUserName = (maxNumberOfFrags = 3) => {
  let newName = false;
  var newUserName;
  while (!newName) {
    const { userNameFragsL } = userLengths;
    let numOfFrags = randInt(maxNumberOfFrags, "ceil");
    newUserName = "";
    while (numOfFrags--) {
      newUserName += userNameFrags[randInt(userNameFragsL)];
    }
    if (createdNames.indexOf(newUserName) === -1) {
      createdNames.push(newUserName);
      newName = true;
    }
  }
  return newUserName;
};

const genRandDonationForUser = (userId, lat, lng, maxTags = 3) => {
  const { titlesL, descriptionsL, categoriesL, tagsL, locationsL } =
    claimableLengths;
    let tags = ['new', 'like-new', 'used', 'value', 'old', 'colorful', 'heavy', 'clean', 'tropical', 'winter', 'summer', 'spring', 'fall' ]
    let numTags = randInt(maxTags, "round");
    let newTags= [];

    while( numTags > 0 ) {
      newTags.push(tags[randInt(tags.length - 1, "floor")])
      numTags--;
    }
  return {
    posted_by: userId,
    title: titles[randInt(titlesL)],
    description: descriptions[randInt(descriptionsL)],
    category: categories[randInt(categoriesL)],
    tag: newTags,
    charity_only: !!randInt(1, "round"),
    pictures: photos,
    interested_users: [],
    lat,
    lng
  };
};

const allDonations = [];
let currentDonations = [];

const genRandUser = (id, donoRange = 4) => {
  const { firstNamesL, lastNamesL, userNameFragsL, locationsL } = userLengths;
  const user_name = genRandUserName();
  const lat = genRandFromRange(lats);
  const lng = genRandFromRange(lngs);

  const numDonations = randInt(donoRange, "round");
  const newDonos = [];
  while (numDonations > newDonos.length) {
    const newDono = genRandDonationForUser(user_name, lat, lng);
    currentDonations.push(newDono);
    allDonations.push(newDono);
    newDonos.push(allDonations.length);
  }

  return {
    first_name: firstNames[randInt(firstNamesL)],
    last_name: lastNames[randInt(lastNamesL)],
    user_name,
    lat,
    lng,
    password: auth.hashPassword("shalom"),
    charity_state: charity_states[randInt(charity_states.length)]
  };
};

const genAll = (numUsers, currentUsers, allUserNames) => {
  createdNames = allUserNames || [];
  const data = { users: [], donations: [] };
  let i = 0;
  while (numUsers > i) {
    i++;
    data.users.push(genRandUser(i + currentUsers));
  }
  data.donations = currentDonations;
  currentDonations = [];
  return data;
};

module.exports.all = genAll;

// const maxInterests = 5;
// const genRandInterests = (numClaimables) => {
//   let numInterests = randInt(maxInterests, 'ceil')
//   let newInterests = []
//   while (numInterests--) {
//     newInterests.push( randInt(numClaimables, 'round') )
//   }
//   return newInterests
// }

// const genRandFromRange = (range) => {
//   const dif = range[1] - range[0]
//   return range[0] + (dif * Math.random())
// }

// const genRandUserName = (maxNumberOfFrags = 5) => {
//   const { userNameFragsL } = userLengths
//   let numOfFrags = randInt(maxNumberOfFrags, 'ceil')
//   let newUserName = ''
//   while (numOfFrags--) {
//     newUserName += userNameFrags[( randInt(userNameFragsL) )]
//   }
//   return newUserName
// }

// const maxInterests = 5;
// const genRandInterests = (numClaimables) => {
//   let numInterests = randInt(maxInterests, 'ceil')
//   let newInterests = []
//   while (numInterests--) {
//     newInterests.push( randInt(numClaimables, 'round') )
//   }
//   return newInterests
// }

// const genRandDonationForUser = (userId, lat, lng) => {
//   const { titlesL, descriptionsL, categoriesL, tagsL, locationsL, } = claimableLengths
//   return {
//     posted_by: userId,
//     title: titles[( randInt(titlesL) )],
//     description: descriptions[( randInt(descriptionsL) )],
//     category: categorys[( randInt(categoriesL) )],
//     tag: [ tags[( randInt(tagsL) )] ],
//     charity_only: !!randInt(1, 'round'),
//     interested: [],
//     lat,
//     lng,
//   }
// }

// const allDonations = []
// const allDonated = []

// let currentDonations = []
// let currentDonated = []

// const genRandUser = (id, donoRange = 5, donatedRange = 3) => {
//   const { firstNamesL, lastNamesL, userNameFragsL, locationsL, } = userLengths
//   const lat = genRandFromRange(lats)
//   const lng = genRandFromRange(lngs)

//   const numDonations = randInt(donoRange, 'round')
//   const newDonos = []
//   while (numDonations > newDonos.length) {
//     const newDono = genRandDonationForUser(id, lat, lng)
//     currentDonations.push(newDono)
//     allDonations.push(newDono)
//     newDonos.push( allDonations.length )
//   }

//   const numDonated = randInt(donatedRange, 'round')
//   const newDonateds = []
//   while (numDonated > newDonateds.length) {
//     const newDonated = genRandDonatedForUser(id, lat, lng)
//     currentDonated.push(newDonated)
//     allDonated.push(newDonated)
//     newDonateds.push( allDonated.length )
//   }

//   return {
//     first_name: firstNames[( randInt(firstNamesL) )],
//     last_name: lastNames[( randInt(lastNamesL) )],
//     user_name: genRandUserName(),
//     lat,
//     lng,
//     is_charity: !(!!randInt(5, 'round')),
//     interests: [],
//     received: [],
//     donated: newDonateds,
//     donations: newDonos,
//     rating: randInt(10, 'round'),
//   }
// }

// const genRandDonatedForUser = (userId, lat, lng) => {
//   const { titlesL, descriptionsL, categoriesL, tagsL, locationsL, } = claimableLengths
//   return {
//     posted_by: userId,
//     title: titles[( randInt(titlesL) )],
//     description: descriptions[( randInt(descriptionsL) )],
//     category: categorys[( randInt(categoriesL) )],
//     tag: [ tags[( randInt(tagsL) )] ],
//     charity_only: !!randInt(1, 'round'),
//     lat,
//     lng,
//   }
// }

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
