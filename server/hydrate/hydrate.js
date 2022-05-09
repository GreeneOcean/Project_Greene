const { sql } = require('./connect')
const genRand = require('./generator')
const { getTests } = require('./tests')

const DBname = 'blue_ocean_dev'

const test = getTests(sql)

const randGenNums = true;
const baseUserGen = 2000


// Create a seedable randValue generator so we can all have equivelant DB values or our own.
const originalRand = Math.random
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const delay = (time = 1000) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, time)
  })
}


let numRuns = 0
let numUsers = 0
let numClaimables = 0
let numClaimed = 0


const runHydration = async (numUserGen, randGen = randGenNums, print = false) => {


  print && console.log(`HYDRATING DB ${DBname} \nRandom INSERT values set to ${randGen}`)
  numUserGen = randGen ? Math.ceil(Math.random() * baseUserGen) : numUserGen || baseUserGen;
  print && console.log(`Generating ${numUserGen} users`)

  const { users, donations, donated } = genRand.all(numUserGen, numUsers)

  numUsers += users.length
  numClaimables += donations.length
  numClaimed += donated.length
  await sql`INSERT INTO users ${ sql(users) }`
  await sql`INSERT INTO donations ${ sql(donations) }`
  await sql`INSERT INTO donated ${ sql(donated) }`
  // const res = await Promise.all([
  //   sql`INSERT INTO users ${ sql(users) }`,
  //   sql`INSERT INTO donations ${ sql(donations) }` ,
  //   sql`INSERT INTO donated ${ sql(donated) }` ,
  // ])
  // print && console.log(`ALL INSERT res: ${res}`)
  // console.log(`\nINSERTED ${users.length} random users into the USERS table`)
  // console.log(`INSERTED ${donations.length} random donations into the DONATIONS table`)
  // console.log(`INSERTED ${donated.length} random donated into the DONATED table`)

  // print && await test.users()
  // print && await test.claimables()
  // await delay()

}





const hydrate = async (runs = 1) => {
  let vals = await countAll()
  console.log(vals)
  numUsers += vals[0]
  numClaimables += vals[1]
  numClaimed += vals[2]
  const seed = 12345 + vals[0]
  const totalRuns = runs
  Math.random = mulberry32(seed)
  console.log(`SETTING Math.random to ${'mulberry32'} algo and seeded with value: ${seed}`)
  console.log(`\nRunning ${runs} runs of hydration\n`)
  while(runs--) {
    await runHydration( null, randGenNums)
    console.log(` finished run ${ totalRuns - runs }`)
  }

  vals = await countAll()
  console.log(`\nFINISHED ${totalRuns} runs of hydration`)
  console.log(`HYDRATING DB ${DBname} COMPLETE`)
  console.log(`${vals[0]} USERS Total \n${vals[1]} donations Total \n${vals[2]} donated Total`)
  Math.random = originalRand
  console.log('\nRESET Math.random')
}


const countAll = async () => {
  const numDocs = await Promise.all([
    sql`SELECT count(id) FROM users`,
    sql`SELECT count(id) FROM donations`,
    sql`SELECT count(id) FROM donated`,
  ])
  return numDocs.map(res => parseInt(res[0].count))
}

hydrate(process.env.RUNS || 25)
//  export RUNS=10 node hydrate.js
module.exports = { runHydration, hydrate }






// function swap(head) {

//   function runSwap(node0) {
//     var node1 = node0.next
//     var value0 = node0.value;
//     var value1 = node1 ? node1.value : null;
//     if (value1) {
//       node0.value = value1
//       node1.value = value0
//       if (node1.next) {
//         runSwap(node1.next)
//       }
//     }
//   }
//   runSwap(head)
//   return head
// }





// function Node(value, next=null) {
//   this.value = value
//   this.next = next
// }

// var HEAD = new Node(1)
// HEAD.next = new Node(2)
// HEAD.next.next = new Node(3)
// HEAD.next.next.next = new Node(4)
// HEAD.next.next.next.next = new Node(5)

// var tHEAD = swap(JSON.parse(JSON.stringify(HEAD)))


