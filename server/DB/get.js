const { sql } = require('./connect')

const getUser = async ({ userName }) => {
  try {
    const res = await sql`SELECT *,
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = ANY(d.interested_users)) AS interested,
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = d.taken_by) AS received,
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = d.posted_by) AS donated
    FROM users AS u WHERE u.user_name = ${userName};`
    // console.log('getUser res ', res)
    const user = res[0]
    const { interested, received, donated } = user
    const donatedRes = await Promise.all([
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${interested})`,
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${received})`,
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${donated})`,
    ])
    // console.log({donatedRes})
    user.interested = donatedRes[0]
    user.received = donatedRes[1]
    user.donated = donatedRes[2]
    // console.log(user.donated)
    return user
  } catch(err) {
    console.log('getUser err', err.message, 'for id', userName)
    return {}
  }
}

// getUser({ userName: 'not2not' })


const getLocal = async (latPosition, lngPosition, range = 10, count = 100, table = 'donations') => {
  // range = range * mileToKm * 1000
  try {
    var local;
    if(table === 'donations') {
      local = await sql`
      SELECT *, (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) AS distance
      FROM ${ sql(table) }
      WHERE (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) < (${range})
      ORDER BY distance;`
    }
    if(table === 'users') {
      local = await sql`
      SELECT *, (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) AS distance
      FROM ${ sql(table) }
      WHERE (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) < (${range}) AND is_charity = true
      ORDER BY distance;`
    }
    return local.slice(0, count)
  } catch(err) {
    console.log('getLocal err', err.message, 'for params', latPosition, lngPosition, range)
    return {}
  }
}

getLocal.donations = (({ lat, lng, range, count }) => getLocal(lat, lng, range, count, 'donations'))
getLocal.users = (({ lat, lng, range, count }) => getLocal(lat, lng, range, count, 'users'))

const session = async (sessionId) => {
  return sql`SELECT * FROM sessions AS s WHERE s.id = ${sessionId}`
}

const GET = {
  user: getUser,
  local: getLocal,
  session
}

module.exports = GET


// CREATE INDEX    ON base (point(lng, lat) <@> point(lng, lat))