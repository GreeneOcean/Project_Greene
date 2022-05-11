const { session, sessionEnd } = require('./session')
const { sql } = require('../DB/connect.js')
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const salt = 'IB_SY_DB'

const hashPassword = (password) => {
  return crypto.createHash('sha256', salt)
  .update(password)
  .digest('hex');
}



const checkPassword = (passwordToMatch, savedPassword) => {
  passwordToMatch = crypto.createHash('sha256', salt)
    .update(passwordToMatch).digest('hex');
  return passwordToMatch === savedPassword
}


const checkUser = async (user) => {
  const { userId, userName, attempt } = user
  try {
    if (userId) {
      const getPassword = await sql`SELECT user_name, password FROM users WHERE id = ${userId}`
      const savedPassword = getPassword[0].password
      return [getPassword[0].user_name,  checkPassword(attempt, savedPassword) ]
    }
    else {
      const getPassword = await sql`SELECT password FROM users WHERE user_name = ${userName}`
      const savedPassword = getPassword[0].password
      return [userName,  checkPassword(attempt, savedPassword) ]
    }
  }
  catch (err) {
    console.log('err in checkUser', err.message)
    return false
  }
}


module.exports = { session, sessionEnd, user: checkUser, create: hashPassword }