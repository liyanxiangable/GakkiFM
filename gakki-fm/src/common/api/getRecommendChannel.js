/**
 * Created by liyanxiang on 2017/10/9.
 */
import axios from 'axios'
export default function getRecommendChannel () {
  return axios.get('/api/getRecommendChannel')
    .then((res) => {
      // console.log(res.data)
      return res.data
    })
}
