const { sql } = require('../DB/connect')
const { randInt, countAll } = require('./utilities')

const link = async (maxConnections = 3) => {

  const vals = await countAll()
  const [ numUsers, numDonations ] = vals
  let i = numDonations
  const numInteresedPerDonation = []
  while(i--) {
    numInteresedPerDonation.push(randInt(maxConnections, 'round'))
  }
  const randomUsernamesPerDonation = await Promise.all(numInteresedPerDonation.map(async (people) => {
    const userIds = []
    while(people--) {
      userIds.push(randInt(numUsers))
    }
    const interestedUsers = userIds.map(async (userId) => {
      const values =  await sql`SELECT user_name FROM users WHERE id = ${userId}`
      return values.length ? values[0] : []
    })
    return Promise.all(interestedUsers)
  }))


  const reduced = randomUsernamesPerDonation.map((usernames, idx) => {
    const state = usernames.length ? 'claimed' : 'claimed'
    const user = { state,  interested_users: usernames.map(({ user_name }) =>  user_name ? user_name : 'butts') }
    return [idx + 1, user]
  })

  const notEmpty = reduced.filter((each) => {
    return !!each[1].interested_users.length
  })

  const updateRes = await Promise.all(notEmpty.map(async (updateVals, idx) => {
    const [ id, user ] = updateVals
    return sql`UPDATE donations SET ${sql(user)} WHERE id = ${ idx + 1 }`
  }))
}

module.exports = { link }

