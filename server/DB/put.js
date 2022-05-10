const { sql } = require('./connect');

// const PUT = async (newData, table) => {
//   try {
//     if (!Array.isArray(newData)) {
//       newData = [ newData ]
//     }
//     const res = await sql`UPDATE ${sql(table)} ${ sql(newData) }`
//     console.log('PUT res for', table, res)
//     return res
//   } catch(err) {
//     console.log('PUT err for', table, err.message, 'for ', newData)
//     return {}
//   }
// }

const updateInterestInDonation = async (userId, donationId) => {

  try {
    const res = await sql``
    console.log('updateInterestInDonation res ', res)
    return res[0]
  } catch(err) {
    console.log('updateInterestInDonation err', err.message)
    return {}
  }
}

const updateApproveUserClaim = async (userId, donationId, state) => {
  //state: claimed, pending, approved, completed,
  try {
    const res = await sql``
    console.log('updateApproveUserClaim res ', res)
    return res[0]
  } catch(err) {
    console.log('updateApproveUserClaim err', err.message)
    return {}
  }
}

const updateAdminApproveUser = async (userId, state) => {

  try {
    const res = await sql`UPDATE users SET is_charity = ${state}`
    console.log('updateAdminApproveUser res ', res)
    return res[0]
  } catch(err) {
    console.log('updateAdminApproveUser err', err.message, 'for id', userId)
    return {}
  }
}