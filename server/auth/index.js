const { session } = require('./session')
const { sql } = require('../DB/connect.js')
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const salt = 'butts'

const hashPassword = (password) => {
  return crypto.createHash('sha256', password + salt).digest('hex');
}
// const test = hashPassword('read')
// console.log({ test })


const checkPassword = (passwordToMatch, savedPassword) => {
  passwordToMatch = crypto.createHash('sha256', passwordToMatch + salt).digest('hex');
  return passwordToMatch === savedPassword
}


const checkUser = async (user) => {
  const { userId, attempt } = user
  try {
    const getPassword = await sql`SELECT password FROM sessions WHERE id = ${userId}`
    const savedPassword = getPassword[0].password
    return checkPassword(attempt, savedPassword)
  }
  catch (err) {
    console.log('err in checkUser', err.message)
    return false
  }
}

// console.log(checkPassword('read', test))

module.exports = { session, user: checkUser, create: hashPassword }