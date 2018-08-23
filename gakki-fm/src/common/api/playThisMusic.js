/**
 * Created by liyanxiang on 2017/9/28.
 */
import axios from 'axios'

export function playThisMusic (music) {
  let url = ''
  getMusicUrl(music.id).then((res) => {
    if (res.code === 200) {
      url = res.data[0].url
    } else {
      console.log('未能获取播放地址')
    }
  })
}

export function getMusicUrl(id) {
  let url = `/api/getMusicUrl/url?id=${id}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
