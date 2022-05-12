
import { getLocation } from './location'

const BASE_URL = `http://localhost:8080`


function addQueries(queries) {
  return Object.entries(queries).reduce((memo, keyVal) => {
    const [ key, value ] = keyVal
    memo +=  `${key}=${value}&`
    return memo
  }, '?')
}



function buildEndpoint(endpoint, queries) {
  return queries ? `${BASE_URL}${endpoint}${addQueries(queries)}` : `${BASE_URL}${endpoint}`
}

function buildGetOptions(endpoint, params) {
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


function buildPostOptions(endpoint, data = {}, params) {
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

function buildPutOptions(endpoint, data = {}, params) {
  return [
    buildEndpoint(endpoint, params),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    },
  ]
}


function runFetch(url, options) {
  console.log({ url })
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(`FETCH err ${err.message} \nURL: ${url} \noptions: ${options}`))
}


function get(endpoint, queries) {
  return runFetch(...buildGetOptions(endpoint, queries))
}

get.location = ((dispatch) => {
  getLocation()
  .then(locationRes => {
    api.get.local.donations({ ...locationRes, count: 300 })
    .then(apiRes => {
      console.log('location', {...locationRes, local: apiRes })
      dispatch({
        type: `USER_INIT`,
        payload: { ...locationRes, local: apiRes }
      })
    })
  }).catch(err => console.log('location err', err.message))
})



function getData(path, queries) {
  return get('/data' + path, queries)
}
get.data = getData
get.local = {}
get.local.charities = ((queries) => get.data('/local/users', queries))
get.local.donations = ((queries) => get.data('/local/donations', queries))


get.user = ((queries) => get.data())



function getLogin(query) {
  return runFetch(...buildGetOptions('/user/login', query))
}
get.login = getLogin


get.login.user = ((query, dispatch) => {
  return get.login(query)
  .then(loginRes => {
    const { user } = loginRes
    console.log('userRes', user)
    if (user.id) {
      dispatch({
        type: `USER_INIT`,
        payload: user
      })
    }
  }).catch(err => console.log('login err', err.message))
})


function getAuth(queries) {
  return get('/Auth', queries)
}
get.Auth = getAuth

function getBrowse(queries) {
  return get('/Browse', queries)
}
get.Browse = getBrowse
function getDonate(queries) {
  return get('/Donate', queries)
}
get.Donate = getDonate

function getHome(queries) {
  return get('/Home', queries)
}
get.Home = getHome

function getItem(queries) {
  return get('/Item', queries)
}
get.Item = getItem

function getTransactions(queries) {
  return get('/Transactions', queries)
}
get.Transactions = getTransactions



function post(endpoint, data, params) {
  return runFetch(...buildPostOptions(endpoint, params, data))
}

function put(endpoint, data, params) {
  return runFetch(...buildPutOptions(endpoint, params, data))
}



const api = {
  get,
  post,
  put
}

export default api