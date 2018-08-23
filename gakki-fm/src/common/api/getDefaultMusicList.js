/**
 * Created by liyanxiang on 2017/9/28.
 */
import axios from 'axios'

export default function getDefaultMusicList () {
  return axios.get('/api/getDefaultMusicList')
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
