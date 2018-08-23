/**
 * Created by liyanxiang on 2017/10/13.
 */
import axios from 'axios'
export default function login (username, password) {
  axios.get('/api/login', {
    params: {
      username: username,
      password: password,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
