const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));


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



app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});