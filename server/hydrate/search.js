const { sql } = require('./connect')

//  WHERE lat > 10 AND lat < 20 AND lng > 30 AND lng < 45


const mileToKm = 0.621371

const findNearby = async (latPosition, lngPosition, range = 1) => {
  // range = range * mileToKm * 1000
  const local = await sql`
  SELECT *, (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) AS distance
  FROM donations
  WHERE (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) < (${range})
  ORDER BY distance;`
  return local
}


const testFind = async () => {
  let max = await sql`SELECT count(id) FROM users;`
  max = max[0].count
  const id = Math.round(max * Math.random())
  const res = await sql`SELECT u.lat, u.lng FROM users AS u WHERE u.id = ${id}`
  const user = res[0]
  const local = await findNearby(user.lat, user.lng)
  console.log('local',  local[0])
  console.log('num local',  local.length)
  console.log(`user id: ${id} lat, lng`, user)
}
testFind()


// `
// SELECT *, (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) * 1609.344 AS distance
// FROM
// claimables
// WHERE
//     (point(lng, lat) <@> point(${lngPosition}, ${latPosition})) < (${range} / 1609.344)
// ORDER BY
//  distance;
// `

// const local = await sql`SELECT *, ROUND(earth_distance(ll_to_earth(${latPosition}, ${lngPosition}), ll_to_earth(lat, lng))::NUMERIC, 2) AS distance
// FROM
// claimables
// WHERE
//  earth_box(ll_to_earth (${latPosition}, ${lngPosition}), ${range}) @> ll_to_earth (lat, lng)
//  AND earth_distance(ll_to_earth (${latPosition}, ${lngPosition}), ll_to_earth (lat, lng)) < ${range}
// ORDER BY distance;`


// EXPLAIN ANALYZE SELECT *, (point(lng, lat) <@> point(14, 55)) * 1609.344 AS distance
// FROM
// claimables
// WHERE
//     (point(lng, lat) <@> point(14, 55)) < (10 / 1609.344)
// ORDER BY
//  distance;

