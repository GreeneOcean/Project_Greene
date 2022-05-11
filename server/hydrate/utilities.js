const { sql } = require('../DB/connect')

const randInt = (max, type = 'floor') => {
  if (type === 'floor') {
    return Math.floor(Math.random() * max)
  }
  if (type === 'ceil') {
    return Math.ceil(Math.random() * max)
  }
  if (type === 'round') {
    return Math.round(Math.random() * max)
  }
  return Math.random() * max
}


const countAll = async () => {
  const numDocs = await Promise.all([
    sql`SELECT count(id) FROM users`,
    sql`SELECT count(id) FROM donations`,
  ])
  return numDocs.map(res => parseInt(res[0].count))
}



function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}



module.exports = { randInt, countAll, mulberry32 }