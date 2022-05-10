const sql = require('./hydrate')

const getUser = async (userId) => {
  try {
    const res = await sql`SELECT * FROM  users AS u WHERE u.id = ${userId}`
    console.log('getUser res ', res)
    return res[0]
  } catch(err) {
    console.log('getUser err', err.message, 'for id', userId)
    return {}
  }
}


const getNearby = async (latPosition, lngPosition, range = 10) => {
  // range = range * mileToKm * 1000
  try {
    const local = await sql`
    SELECT *, (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) AS distance
    FROM donations
    WHERE (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) < (${range})
    ORDER BY distance;`
    return local
  } catch(err) {
    console.log('getNearby err', err.message, 'for params', latPosition, lngPosition, range)
    return {}
  }
}


const GET = {
  user: getUser
  nearby: getNearby
}

module.exports = GET


// CREATE INDEX    ON base (point(lng, lat) <@> point(lng, lat))