const { sql } = require('./connect');

const PUT = async (newData, table) => {
  try {
    if (table === 'users') {
      const { user_name } = newData
      delete newData.user_name
      return await sql`UPDATE ${sql(table)} SET ${ sql(newData) } WHERE user_name =  ${user_name}`

    } else {
      const { id } = newData
      delete newData.id
      return await sql`UPDATE ${sql(table)} SET ${ sql(newData) } WHERE id = ${ id }`
    }

  } catch(err) {
    console.log('PUT err for', table, err.message, 'for ', newData)
    return {}
  }
}

const updateInterestInDonation = async ({ userName, donationId }) => {

  try {
    const res = await sql`
    UPDATE donations
    SET interested_users = array_append(interested_users, ${userName})
    WHERE id = ${donationId} AND  ${userName} != ALL(interested_users)`
    console.log('updateInterestInDonation res ', res)
    return res[0]
  } catch(err) {
    console.log('updateInterestInDonation err', err.message)
    return {}
  }
}



PUT.session = (async (updatedSession) => {
  delete updatedSession.id
  updatedSession.user_name = updatedSession.user_name || null
  return await PUT(updatedSession, 'sessions')
})

PUT.user = (async (updatedUser) => {
  return await PUT(updatedUser, 'users')
})



PUT.donation = (async (updatedDonation) => {
  return await PUT(updatedDonation, 'donations')
})

PUT.interest = updateInterestInDonation



module.exports = PUT