const { sql } = require('./connect')

const userFields = [
 'id',
 'last_name',
 'user_name',
 'first_name',
 'charity_state',
]

//ARRAY(SELECT id FROM donations AS d WHERE ${userName} = d.posted_by AND d.interested_user IS NULL) AS unclaimed,
const getUser = async ({ userName }) => {
  try {
    const res = await sql`SELECT ${ sql(userFields) },
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = ANY(d.interested_users)) AS interested,
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = d.taken_by) AS received,
    ARRAY(SELECT id FROM donations AS d WHERE ${userName} = d.posted_by) AS donated
    FROM users AS u WHERE u.user_name = ${userName};`
    const user = res[0]
    const { interested, received, donated } = user
    const donatedRes = await Promise.all([
      // sql`SELECT * FROM donations AS d WHERE d.id = ANY(${unclaimed})`,
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${interested})`,
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${received})`,
      sql`SELECT * FROM donations AS d WHERE d.id = ANY(${donated})`,
    ])
    user.interested = donatedRes[0]
    user.received = donatedRes[1]
    user.donated = donatedRes[2]
    return user
  } catch(err) {
    console.log('getUser err', err.message, 'for id', userName)
    return {}
  }
}



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

const getAdminCharitiesByState = async (state) => {
  try {
    const pendingList = await sql`SELECT user_name FROM users WHERE charity_state = ${state}`
    return pendingList
  } catch(err) {
    console.log('getAdminPendingList', err.message)
  }
}



const charities = async () => {
  return await getAdminCharitiesByState('true')
}

charities.pending = (() => getAdminCharitiesByState('pending'))
charities.denied = (() => getAdminCharitiesByState('denied'))

const GET = {
  user: getUser,
  local: getLocal,
  session,
  charities,
}



module.exports = GET


