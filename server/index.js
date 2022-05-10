const express = require('express');
const path = require('path');

const PORT = 3000;



const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));


const { db } = require('./DB/index')


app.get('/Auth', (req, res) => {
  console.log(`Request at ${`/Auth`}`)
  res.status(200).send({ AuthData: true })
})

app.get('/Browse', (req, res) => {
  console.log(`Request at ${`/Browse`}`)
  res.status(200).send({ BrowseData: true })
})

app.get('/Donate', (req, res) => {
  console.log(`Request at ${`/Donate`}`)
  res.status(200).send({ DonateData: true })
})

app.get('/Home', (req, res) => {
  console.log(`Request at ${`/Home`}`)
  res.status(200).send({ HomeData: true })
})

app.get('/Item', (req, res) => {
  console.log(`Request at ${`/Item`}`)
  res.status(200).send({ ItemData: true })
})

app.get('/Transactions', (req, res) => {
  console.log(`Request at ${`/Transactions`}`)
  res.status(200).send({ TransactionsData: true })
})

/////////

app.get('/data/*', async (req, res) => {

  console.log(`Request at ${`/`}`)
  const reqPath = req.path.split('/').filter(str => !!str.length)
  reqPath[0] = 'GET'
  const params = req.query

  try {
    var query = db;
    reqPath.forEach(route => {
      query = query[route]
    })
    console.log({ params })
    console.log({ reqPath })
    console.log({ query })
    const dbRes = await query(params)
    // console.log({ dbRes })
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