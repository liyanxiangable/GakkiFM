<template>
  <div class="gakki">
    <header-bar>
      <toggle-button slot="left"></toggle-button>
      <toggle-button slot="right"></toggle-button>
    </header-bar>
    <keep-alive>
      <router-view :duringArray="duringArray" :sentenceArray="sentenceArray"></router-view>
    </keep-alive>
    <audio :src="currentMusicUrl" autoplay @ended="_playDefaultMusic(currentMusicIndex)" ref="audio"></audio>
  </div>
</template>

<script>
  import HeaderBar from 'components/header-bar/header-bar'
  import ToggleButton from 'components/toggle-button/toggle-button'
  import {mapState} from 'vuex'
  import isDuplicated from 'js/isDuplicated'
  import {getMusicUrl} from 'api/playThisMusic'
  import getLyrics from 'api/getLyrics'

  export default {
    name: 'app',
    components: {
      HeaderBar,
      ToggleButton,
    },
    data () {
      return {
        lyrics: '',
        duringArray: [],
        sentenceArray: [],
        helloo: 'liyanxiang'
      }
    },
    computed: {
        /*
      hello () {
        let msg = ''
        let array = ['xin', 'yuan', 'jie', 'yi']
        let i = 0
        setInterval(function () {
          msg = array[i]
          console.log('app', msg)
          if (i === 3) {
            i = 0
          } else {
            i++
          }
        }, 2000)
        return msg
      },
      */
      ...mapState([
        'currentMusicIndex',
        'currentMusicUrl',
        'playMode',
        'currentMusicList',
        'currentMusicPictureSrc',
        'history',
        'isPlaying',
      ]),
    },
    created () {

    },
    methods: {
      _playDefaultMusic () {
        console.log('play default music')
        this._getNewIndex()
        this._changeMusicSrc()
      },
      _getNewIndex () {
        // 0代表单曲循环，1代表顺序播放，2代表随机播放
        let lastMusicIndex = this.currentMusicIndex
        if (this.playMode === 2) {
          // 生成随机索引
          this.$store.commit('setRandomIndex', Math.floor(Math.random() * this.currentMusicList.length))
        } else if (this.playMode === 1) {
          this.$store.commit('setOrderIndex')
        }
        // 在随机播放的时候判断时候为重复歌曲
        if(this.playMode === 2) {
          if (isDuplicated(this.currentMusicList[lastMusicIndex],
              this.currentMusicList[this.currentMusicIndex])) {
            console.log('the music is duplicated to the last one');
            this._playDefaultMusic()
          }
        }
        this._updateHistory()
      },
      _changeMusicSrc (id = this.currentMusicList[this.currentMusicIndex].id) {
        getMusicUrl(id)
          .then((res) => {
            console.log('开始获取歌曲 ' + this.currentMusicList[this.currentMusicIndex].name + ' 播放地址')
            this.$store.commit('setCurrentMusicUrl', res.data[0].url)
            console.log('获取到歌曲播放地址为 ' + this.currentMusicUrl)
          })
      },
      _updateHistory () {
        // 判断目前的歌曲是否与本地记录的最后一条有重复
        if (this.history.length !== 0 &&
          isDuplicated(this.currentMusicList[this.currentMusicIndex], this._getPrevMusic)) {
          console.log('%cDUPLICATED',"color: red; background: yellow; font-size: 24px;")
        } else {
          // 更新本地历史纪录
          this.$store.commit('updateHistory')
        }
        console.log(this.history)
        // 更新用户历史纪录
      },
      _getPrevMusic () {
        if (this.history.length === 1) {
          return null
        } else {
          return this.history[this.history.length - 2]
        }
      },
      setMusicPictureSrc (src) {
        console.log('%ssetMusicPictureSrc', "font-size=30px", src)
      }
    },
    watch: {
      currentMusicUrl: function (newVal, oldVal) {
        let audioElement = this.$refs.audio
        console.log('切换专辑封面')
        this.$store.commit('setCurrentMusicPictureSrc')
        setTimeout(function () {
          console.log('开始播放音乐')
          audioElement.load()
          let isPlaying = audioElement.currentTime > 0 && !audioElement.paused && !audioElement.ended
            && audioElement.readyState > 2;
          if (!isPlaying) {
            audioElement.play()
          }
        }, 20)
        let id = this.currentMusicList[this.currentMusicIndex].id
        getLyrics(id).then((res) => {
          this.lyrics = res.lrc.lyric
          let lyricArray = this.lyrics.split('\n')
          // console.log(lyricArray)
          let timeArray = []
          let sentenceArray = []
          let duringArray = []
          lyricArray.forEach((string) => {
            // console.log(string)
            let timeLength = string.indexOf(']')
            timeArray.push(string.substr(1, timeLength - 1))
            let sentence = string.substr(timeLength + 1)
            if (sentence.length === 0) {
              sentence = ' '
            }
            sentenceArray.push(sentence)
          })
          for (let i = 0; i < timeArray.length - 1; i++) {
            let carry = parseInt(timeArray[i + 1].substring(0, 2)) - parseInt(timeArray[i].substring(0, 2))
            let second = parseInt(timeArray[i + 1].substring(3, 5)) - parseInt(timeArray[i].substring(3, 5))
            let mSecond = parseInt(timeArray[i + 1].substring(6)) - parseInt(timeArray[i].substring(6))
            let duration = carry * 60 + second + mSecond * 0.001
            if (duration !== duration) {
              duration = 0
            }
            duringArray.push(duration)
          }
          duringArray[duringArray.length - 1] = 1
          this.duringArray = duringArray
          this.sentenceArray = sentenceArray
          // console.log(timeArray)
          // console.log(duringArray)
          // console.log(sentenceArray)
        })
        this.$store.commit('changeCurrentMusicId', id)
        console.log('当前歌曲id为 ' + this.$store.state.currentMusicId)
      },
      isPlaying () {
        if (this.isPlaying === true) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      },
      currentMusicPictureSrc (newVal, oldVal) {
        document.get
      }
    }
  }
</script>

<style>
  .gakki {
    width: 100vw;
    height: 100vh;
    //background-color: gray;
  }
</style>
