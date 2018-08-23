/**
 * Created by liyanxiang on 2017/9/28.
 */
var axios = require('axios')
var express = require('express')

var apiRouter = express.Router()

var headers = {
    referer: 'http://localhost:3000/',
    host: 'localhost:3000'
};
var referer = 'http://localhost:3000/'

apiRouter.get('/getDefaultMusicList', function (req, res) {
  let url = referer + 'personalized/newsong'
  axios.get(url, {
    headers: headers,
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})

apiRouter.get('/getMusicUrl/url', function (req, res) {
  let url = referer + `music/url`
  axios.get(url, {
    headers: headers,
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})

apiRouter.get('/getRecommendChannel', function (req, res) {
  let personalizedUrl = referer + 'personalized'
  let djRecommendUrl =  referer + 'dj/recommend'
  let topPlaylistUrl = referer + 'top/playlist'
  let threeResults = {}

  let first = axios.get(personalizedUrl, {
    headers: headers,
  })
  let second = axios.get(djRecommendUrl, {
    headers: headers,
  })
  let third = axios.get(topPlaylistUrl, {
    headers: headers,
  })

  Promise.all([first, second, third]).then(values => {
    threeResults.personalized = values[0].data
    threeResults.djRecommend = values[1].data
    threeResults.topPlaylist = values[2].data
    res.json(threeResults)
  }).catch(err => {
    console.log(err)
  })
})

apiRouter.get('/login', function (req, res) {
  let url = 'http://MY_JAVA_BACKEND_HOST_INTERFACE'
  axios.get(url, {
    headers: {
      referer: 'http://MY_JAVA_BACKEND_HOST',
      host: 'MY_JAVA_BACKEND_HOST'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch ((err) => {
    console.log(err)
  })
})

apiRouter.post('/register', function (req, res) {
  console.log('apiRouter---register')
  console.log(req.body)
  /*
  let url = 'http://MY_JAVA_BACKEND_HOST_INTERFACE'
  axios.post(url, {
    headers: {
      referer: 'http://MY_JAVA_BACKEND_HOST',
      host: 'MY_JAVA_BACKEND_HOST'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch ((err) => {
    console.log(err)
  })
  */
})

apiRouter.get('/getLyrics', function (req, res) {
  let url = referer + 'lyric'
  axios.get(url, {
    headers: headers,
    params: req.query,
  }).then((response) => {
    res.json(response.data)
  }).catch ((err) => {
    console.log(err)
  })
})

module.exports = apiRouter
