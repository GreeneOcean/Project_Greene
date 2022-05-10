
const BASE_URL = `http://localhost:3000`

function buildEndpoint(endpoint, params) {
  return `${BASE_URL}${endpoint}`
}

function buildGetOptions(endpoint, params = {}) {
  return [
    buildEndpoint(endpoint, params),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    },
  ]
}


function buildPostOptions(endpoint, params = {}, data = {}) {
  return [
    buildEndpoint(endpoint, params),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    },
  ]
}


function runFetch(url, options) {
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(`FETCH err ${err.message} \nURL: ${url} \noptions: ${options}`))
}


function get(endpoint, params) {
  return runFetch(...buildGetOptions(endpoint, params))
}

function getAuth(params) {
  return get('/Auth', params)
}
get.Auth = getAuth

function getBrowse(params) {
  return get('/Browse', params)
}
get.Browse = getBrowse
function getDonate(params) {
  return get('/Donate', params)
}
get.Donate = getDonate

function getHome(params) {
  return get('/Home', params)
}
get.Home = getHome

function getItem(params) {
  return get('/Item', params)
}
get.Item = getItem

function getTransactions(params) {
  return get('/Transactions', params)
}
get.Transactions = getTransactions



function post(endpoint, params, data) {
  return runFetch(...buildPostOptions(endpoint, params, data))
}

const api = {
  get,
  post
}

export default api