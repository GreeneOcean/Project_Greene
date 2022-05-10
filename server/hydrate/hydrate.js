const { sql } = require('../DB/connect')
const { link } = require('./link')
const { countAll, mulberry32 } = require('./utilities')
const genRand = require('./generator')

const DBname = 'blue_ocean_dev'


const randGenNums = true;
const baseUserGen = 500


// Create a seedable randValue generator so we can all have equivelant DB values or our own.
const originalRand = Math.random



var allUserNames
let numRuns = 0
let numUsers = 0
let numClaimables = 0


const runHydration = async (numUserGen, randGen = randGenNums, print = false) => {

  print && console.log(`HYDRATING DB ${DBname} \nRandom INSERT values set to ${randGen}`)
  numUserGen = randGen ? Math.ceil(Math.random() * baseUserGen) : numUserGen || baseUserGen;
  print && console.log(`Generating ${numUserGen} users`)

  const { users, donations } = genRand.all(numUserGen, numUsers, allUserNames)

  numUsers += users.length
  numClaimables += donations.length
  await sql`INSERT INTO users ${ sql(users) }`
  await sql`INSERT INTO donations ${ sql(donations) }`

}







const hydrate = async (runs = 1) => {
  let vals = await countAll()
  console.log(vals)
  numUsers += vals[0]
  numClaimables += vals[1]
  const seed = 12345 + vals[0]
  const totalRuns = runs
  Math.random = mulberry32(seed)
  console.log(`SETTING Math.random to ${'mulberry32'} algo and seeded with value: ${seed}`)
  console.log(`\nRunning ${runs} runs of hydration\n`)
  allUserNames = await sql`SELECT user_name FROM users`
  allUserNames = allUserNames.map((username) => {
    return username.user_name
  })
  while(runs--) {
    await runHydration( null, randGenNums)
    console.log(` finished run ${ totalRuns - runs }`)
  }

  vals = await countAll()
  console.log(`\nFINISHED ${totalRuns} runs of hydration`)
  console.log(`HYDRATING DB ${DBname} COMPLETE`)
  console.log(`${vals[0]} USERS Total \n${vals[1]} donations Total`)
  Math.random = originalRand
  console.log('\nRESET Math.random')
  console.log('linking donations to users')
  await link()
  console.log('Linked')
}




hydrate(process.env.RUNS || 10)
//  export RUNS=10 node hydrate.js
// module.exports = { runHydration, hydrate }

