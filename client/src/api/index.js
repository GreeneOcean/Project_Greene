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
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(`FETCH err ${err.message} \nURL: ${url} \noptions: ${options}`))
}

//GET
function get(endpoint, queries) {
  return runFetch(...buildGetOptions(endpoint, queries))
}

function getUserLocation(dispatch) {
  return getLocation()
    .then(locationRes => {
      get.local.donations({ ...locationRes, count: 300 })
      .then(apiRes => {
        dispatch({
          type: `USER_INIT`,
          payload: { ...locationRes, local: apiRes }
        })
      })
    })
    .catch(err => console.log('location err', err.message))
}

get.location = getUserLocation



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


function loginUser(query, dispatch) {
  return getLogin(query)
    .then(loginRes => {
      const { user } = loginRes
      if (user.id) {
        dispatch({
          type: `USER_INIT`,
          payload: user
        })
      }
    })
    .catch(err => console.log('login err', err.message))
}


get.login = loginUser





//POST
function post(endpoint, data, params) {
  return runFetch(...buildPostOptions(endpoint, data, params))
}

function postDonation(data) {
  return post('/donation', data)
}
post.donation = postDonation

function postReview(data) {
  return post('/review', data)
}
post.review = postReview

post.user = ((data) => post('/user', data))




//PUT
function put(endpoint, data, params) {
  return runFetch(...buildPutOptions(endpoint, data))
}

put.interest = ((data) => put('/interest', data))
put.donation = ((data) => put('/donation', data))
put.user = ((data) => put('/user', data))


api.put.donation({

})

function putApproveUserClaim(data) {
  return put('/ApproveUserClaim', data)
}
put.ApproveUserClaim = putApproveUserClaim

function putAdminApproveUser(data) {
  return put('/AdminApproveUser', data)
}
put.AdminApproveUser = putAdminApproveUser



const api = {
  get,
  post,
  put
}

export default api



  // api.post.user({
  //   user_name: 'Dora',
  //   first_name: 'thank you for',
  //   last_name: 'helping him that what im here for',
  //   password: 'test',
  //   lat: user.lat,
  //   lng: user.lng,
  // })
  // .then(postUserRes => {
  //   console.log({ postUserRes })
  // })
  // .catch(err => console.log('Post user err', err.message))

  // api.put.user({
  //   last_name: 'Smiterson',
  //   lat: user.lat,
  //   lng: user.lng,
  // })
  // .then(postUserRes => {
  //   console.log({ postUserRes })
  // })
  // .catch(err => console.log('Put user err', err.message))

  // api.post.donation({
  //   posted_by: 'Dora',
  //   title: 'thank you for',
  //   description: 'helping him that what im here for',
  //   category: ['tests'],
  //   pictures: [],
  //   interested_users: [],
  //   lat: user.lat,
  //   lng: user.lng,
  // })
  // .then(postDonationRes => {
  //   console.log({ postDonationRes })
  // })
  // .catch(err => console.log('Post donation err', err.message))

// // APPROVE USER
//   api.put.donation({
//     id: // required do not change
//     approved_user: 'Dora', // new user from in interested users
//     state: 'approved',
//   })
//   .then(postDonationRes => {
//     console.log({ postDonationRes })
//   })
//   .catch(err => console.log('Post donation err', err.message))

// // CONFIRM DONATION/PICK UP
//   api.put.donation({
//     id: // required do not change
//     taken_by: 'Dora', // user who recieved donation
//     state: 'donated'
//   })
//   .then(postDonationRes => {
//     console.log({ postDonationRes })
//   })
//   .catch(err => console.log('Post donation err', err.message))