/**
 * Created by liyanxiang on 2017/9/29.
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否正在播放
    isPlaying: true,
    // 是否点击喜欢这是歌曲
    likeThisMusic: false,
    // 音乐时长
    musicDuration: 0,
    // 播放模式，0代表单曲循环，1代表顺序播放，2代表随机播放
    playMode: 1,
    // 是否播放用户自定义歌曲，若不是则为播放推荐频道
    privateSongList: false,
    // 当前播放列表
    currentMusicList: [],
    // 当前播放音乐资源url
    currentMusicUrl: '',
    // 当前播放音乐在播放列表中的索引
    currentMusicIndex: 0,
    // 当前播放音乐的专辑图片资源
    currentMusicPictureSrc: '',
    // 播放记录
    history: [],
    // 播放记录长度
    historyLength: 5,
    // 页面，1表示播放器页面，2表示各种频道页面，3表示个人中心页面
    page: 1,
    // 登录状态
    isLogin: false,
    // 当前音乐id
    currentMusicId: null,
    // 临时变量
    lyric: [],
    duration: [],
  },
  mutations: {
    // 切换播放与暂停状态
    togglePlayPause (state) {
      state.isPlaying = !state.isPlaying
    },
    changePlayMode (state) {
      if (state.playMode === 2) {
        state.playMode = 0
      } else {
        state.playMode += 1
      }
    },
    toggleLikeThisMusic (state) {
      state.likeThisMusic = !state.likeThisMusic
    },
    updateMusicList (state, list) {
      state.currentMusicList = list
    },
    setRandomIndex (state) {
      state.currentMusicIndex = Math.floor(Math.random() * this.currentMusicList.length)
    },
    setOrderIndex (state) {
      if (state.currentMusicIndex === state.currentMusicList.length - 1) {
        state.currentMusicIndex = 0
      } else {
        state.currentMusicIndex += 1
      }
    },
    updateHistory (state) {
      if (state.history.length === state.historyLength) {
        for (let i = 1; i < state.historyLength; i++) {
          state.history[i - 1] = state.history[i]
        }
        state.history[state.historyLength - 1] = state.currentMusicList[state.currentMusicIndex]
      } else {
        state.history.push(state.currentMusicList[state.currentMusicIndex])
      }
    },
    setCurrentMusicUrl (state, url) {
      state.currentMusicUrl = url
    },
    setToPrevIndex (state) {
      if (state.currentMusicIndex === 0) {
        state.currentMusicIndex = state.currentMusicList.length - 1
      } else {
        state.currentMusicIndex = state.currentMusicIndex - 1
      }
    },
    setCurrentMusicPictureSrc (state) {
      state.currentMusicPictureSrc = state.currentMusicList[state.currentMusicIndex].song.album.picUrl
    },
    setPage (state, page) {
      state.page = page
    },
    toggleIsLoginIn (state) {
      state.isLogin = !state.isLogin
    },
    changeCurrentMusicId (state, newId) {
      state.currentMusicId = newId
    },
  },

  getters: {
    showIsPlaying: state => {
      return state.isPlaying;
    }
  },
  actions: {

  }
})
