const { sql } = require('./connect')

const POST = async (newData, table) => {
  try {
    if (!Array.isArray(newData)) {
      newData = [ newData ]
    }
    const res = await sql`INSERT INTO ${sql(table)} ${ sql(newData) }`
    console.log('POST res for', table, res)
    return res
  } catch(err) {
    console.log('POST err for', table, err.message, 'for ', newData)
    return {}
  }
}

POST.user = async (newUser) => {
  return await POST(newUser, 'users')
}

POST.donations = async (newDonation) => {
  return await POST(newDonation, 'donations')
}

POST.donated = async (newDonated) => {
  return await POST(newClaim, 'donated')
}

// const genRand = require('./generator')
// const test = async () => {
//   const res = await POST.user(genRand.user(23423))
//   console.log('test res', res)
// }
// let p = test()

module.exports = POST