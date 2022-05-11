const {v4 : uuidv4} = require('uuid')
const DB  = require('../DB/index')


const newSession = async (req, res) => {
  const newSessionId = uuidv4()
  res.cookie('sessionId', newSessionId, { maxAge: 900000, httpOnly: true });
  const user_name  = req.query.userName || null
  const newSession = { id: newSessionId, user_name }
  req.session = newSession
  return DB.POST.session(newSession)
}

const session =  async (req, res, next) => {

  try {

    const { sessionId } = req.cookies
    if( sessionId ) {
      const [ sessionRes ] = await DB.GET.session(sessionId)
      if ( sessionRes ) {
        req.session = sessionRes
        const { user_name } = sessionRes
        if ( user_name ) {
          req.user = await DB.GET.user({ user_name })
        }
      }
      else {
        await newSession (req, res)
      }
      next()
    }

    else {
      await newSession(req, res)
      next()
    }

  } catch(err) {
    console.log(err, 'Err in GET Cookie Session')
  }
}


const sessionEnd = async (req, res, next) => {

  res.on('finish', async () => {

    const updatedSession = req.session
    const { user } = req
    if ( user ) {
      updatedSession.user_name = user.user_name
      DB.PUT.session(updatedSession)
    }

  });
  next();

}

module.exports = { session, sessionEnd }


