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

POST.donation = async (newDonation) => {
  return await POST(newDonation, 'donations')
}


POST.session = async (newSession) => {
  return await POST(newSession, 'sessions')
}

POST.review = async (newReview) => {
  return await POST(newReview, 'reviews')
}

module.exports = POST