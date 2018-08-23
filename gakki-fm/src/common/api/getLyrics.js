/**
 * Created by liyanxiang on 2017/10/16.
 */
import axios from 'axios'

export default function getLyrics (id) {
  return axios.get('/api/getLyrics', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
