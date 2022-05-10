const {v4 : uuidv4} = require('uuid')
const { db } = require('../DB/index')


const session =  async (req, res, next) => {

  try {

    if(req.cookies.sessionId) {
      // console.log('found session', req.cookies.sessionId)
      const id = req.cookies.sessionId
      const connectionGET = await db.GET.session(id)
      req.session = connectionGET[0]
      next()
    }

    else {
      const newSessionId = uuidv4()
      res.cookie('sessionId', newSessionId, { maxAge: 900000, httpOnly: true });
      const user_id  = req.query.userId || null
      const newSession = { id: newSessionId, user_id, password:'butts' }
      req.session = newSession
      const connectionPOST = db.POST.session(newSession)
      next()
    }

  } catch(err) {

    console.log(err, 'Err in GET Cookie Session')

  }

}


module.exports = { session }


