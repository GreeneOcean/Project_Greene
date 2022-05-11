const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const DB = require('./DB/index')
const auth = require('./auth/index')

const PORT = 3000;



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use( auth.session )
app.use( auth.sessionEnd );


app.get('/user/login', async(req, res) => {
  try {
    const [ userName, isAuthed ] = await auth.user(req.query)
    if ( isAuthed ) {
      const userData = await DB.GET.user({ userName })
      req.user = userData
      res.status(200).send({ user: userData })
    }
    else {
      res.status(200).send({ user: null })
    }

  } catch(err) {
    console.log('Auth user error ', err.message)
  }
})


app.get('/Auth', (req, res) => {
  res.status(200).send({ AuthData: true })
})

app.get('/Browse', (req, res) => {
  res.status(200).send({ BrowseData: true })
})

app.get('/Donate', (req, res) => {
  res.status(200).send({ DonateData: true })
})

app.get('/Home', (req, res) => {
  res.status(200).send({ HomeData: true })
})

app.get('/Item', (req, res) => {
  res.status(200).send({ ItemData: true })
})

app.get('/Transactions', (req, res) => {
  res.status(200).send({ TransactionsData: true })
})



/////////

app.get('/data/*', async (req, res) => {

  const reqPath = req.path.split('/').filter(str => !!str.length)
  reqPath[0] = 'GET'
  const params = req.query

  try {
    var query = DB;
    reqPath.forEach(route => {
      query = query[route]
    })
    const dbRes = await query(params)
    res.status(200).send(dbRes)

  } catch(err) {
    console.log(`GET req err ${err.message} \nPATH ${req.path}`)
    res.status(500).send({ error: true })
  }
})


app.post('/AddDonation:charityID', (req, res) => {
  console.log(`Request at ${`/AddDonation:charityID`}`)
  res.status(201).send({ TransactionsData: true })
})

app.post('/AddReview:userID', (req, res) => {
  console.log(`Request at ${`/AddReview:userID`}`)
  res.status(201).send({ TransactionsData: true })
})

app.put('/InterestInDonation/:userID', (req, res) => {
  //NEED TO GET ITEM ID TOO
  console.log(`Request at ${`/InterestInDonation/:userID`}`)
  res.status(204).send({ TransactionsData: true })
})

app.put('/ApproveUserClaim/:userID', (req, res) => {
   //NEED TO GET ITEM ID TOO
  console.log(`Request at ${`/ApproveUserClaim/:userID`}`)
  res.status(204).send({ TransactionsData: true })
})

app.put('/AdminApproveUser/:userID', (req, res) => {
  console.log(`Request at ${`/AdminApproveUser/:userID`}`)
  res.status(204).send({ TransactionsData: true })
})


app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});