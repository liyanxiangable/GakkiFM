/**
 * Created by liyanxiang on 2017/10/14.
 */
import axios from 'axios'

export default function register (username, password) {
  console.log('register.js', username, password)
  let params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  axios.post('/api/register', params).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  /*
  axios.post('/api/register', {
    username: username,
    password: password,
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  */
}
