const { sql } = require('./connect');

const PUT = async (newData, table) => {
  try {
    return await sql`UPDATE ${sql(table)} SET ${ sql(newData) }`
  } catch(err) {
    console.log('PUT err for', table, err.message, 'for ', newData)
    return {}
  }
}

const updateInterestInDonation = async (username, donationID) => {

  try {
    const res = await sql`
    UPDATE donations
    SET interested_users = array_append(interested_users, ${username})
    WHERE id = ${donationID} AND  ${username} != ALL(interested_users)`
    console.log('updateInterestInDonation res ', res)
    return res[0]
  } catch(err) {
    console.log('updateInterestInDonation err', err.message)
    return {}
  }
}

const updateApproveUserClaim = async (username, donationID, state) => {
  //state: claimed, pending, approved, completed,
  try {
    const res = await sql`UPDATE donations SET taken_by = ${username}, state = ${state} WHERE id = ${donationID}`
    console.log('updateApproveUserClaim res ', res)
    return res[0]
  } catch(err) {
    console.log('updateApproveUserClaim err', err.message)
    return {}
  }
}



const updateAdminApproveUser = async (username, state) => {

  try {
    const res = await sql`UPDATE users SET is_charity = ${state} WHERE user_name = ${username}`
    console.log('updateAdminApproveUser res ', res)
    return res[0]
  } catch(err) {
    console.log('updateAdminApproveUser err', err.message, 'for username', username)
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




module.exports = PUT