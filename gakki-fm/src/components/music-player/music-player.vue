<template>
  <div class="music-player" ref="player">
    <div class="mid" @click="toggleLyrics">
      <!--
      <audio :src="currentMusicUrl" autoplay @ended="_playDefaultMusic(currentMusicIndex)" ref="audio"></audio>
      -->
      <img v-lazy="currentMusicPictureSrc" class="music-album-picture" v-show="!showTheFuckingLyrics">
      <div v-show="showTheFuckingLyrics" class="lyrics-page" @click.stop="toggleLyrics" ref="lyricsPage">
        <div class="lyrics-wrapper">
          <div class="lyrics-content" ref="content">
            <p :class="['lyrics-row', index === currentIndex ? 'current-row' : '']" v-for="(sentence, index) in sentenceArray">{{ sentence }}</p>
          </div>
        </div>
      </div>
    </div>
    <music-controller v-on:changeToNextMusic="cutToNextSong"
                      v-on:changeToPrevMusic="cutToPrevSong">
    </music-controller>
    <div class="blur" ref="blur">
    </div>
  </div>
</template>


<script>
  import HeaderBar from 'components/header-bar/header-bar'
  import MusicController from 'components/music-controller/music-controller'
  import getDefaultMusicList from 'api/getDefaultMusicList'
  import {getMusicUrl} from 'api/playThisMusic'
  import {mapState} from 'vuex'
  import isDuplicated from 'js/isDuplicated'
  import ToggleButton from 'components/toggle-button/toggle-button'
  import {PAGE_1} from 'js/const'

  export default {
    data () {
      return {
        showTheFuckingLyrics: false,
        scroll: false,
        currentIndex: 5,
        /*
        currentMusicList: [],
        currentMusicUrl: '',
        currentMusicIndex: 0,
        currentMusicPictureSrc: '',
        history: [],
        historyLength: 5,
        nullString: '',
        */
      }
    },
    props: {
      duringArray: {
        default () {
          return []
        },
        type: Array,
      },
      sentenceArray: {
        default () {
          return []
        },
        type: Array,
      },
    },
    components: {
      HeaderBar,
      MusicController,
      ToggleButton,
    },
    created () {
      console.log('MusicPlayer Created')
      this._getDefaultMusicList()
      //this.$store.commit('setPage', PAGE_1)
      console.log('切换到第 ' + this.$store.state.page + ' 页')
    },
    mounted () {
      console.log(this.sentenceArray)
    },
    computed: {
      songName () {
        return this.currentMusicList.length !== 0 ? this.$store.state.currentMusicList[this.$store.state.currentMusicIndex].name : ''
      },
      singerName () {
        return this.currentMusicList.length !== 0 ? this.$store.state.currentMusicList[this.$store.state.currentMusicIndex].song.artists[0].name : ''
      },
      ...mapState([
        'likeThisMusic',
        'playMode',
        'privateSongList',
        'currentMusicIndex',
        'currentMusicList',
        'currentMusicUrl',
        'currentMusicPictureSrc',
        'history',
        'historyLength',
      ])
    },
    methods: {
      cutToNextSong () {
        console.log('cutToNextSong')
        this._playDefaultMusic()
      },
      cutToPrevSong () {
        console.log('cutToPrevSong')
        // let prevMusic = this._getPrevMusic()
        // let id = prevMusic ? prevMusic.id : null
        // this._changeMusicSrc(id)
        this.$store.commit('setToPrevIndex')
        this._changeMusicSrc()
        this._updateHistory()
      },
      _getPrevMusic () {
        if (this.history.length === 1) {
          return null
        } else {
          return this.history[this.history.length - 2]
        }
      },
      _getDefaultMusicList () {
        console.log('执行对默认歌单请求')
        getDefaultMusicList()
          .then((res) => {
            if (res.code === 200) {
              //this.currentMusicList = res.result
              this.$store.commit('updateMusicList', res.result)
              console.log('获取到默认歌单:')
              console.log(this.currentMusicList)
            } else {
              console.log(res.code + '---未获得默认歌单数据')
            }
          })
          .then(() => {
            this._playDefaultMusic()
          })
      },
      _getNewIndex () {
        // 0代表单曲循环，1代表顺序播放，2代表随机播放
        let lastMusicIndex = this.$store.state.currentMusicIndex
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
      _playDefaultMusic () {
        this._getNewIndex()
        this._changeMusicSrc()
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
      _handlePlayModeChanged () {
        console.log('PLAY MODE CHANGED!')
        console.log(this.playMode)
      },
      _handleLikeThisMusicChanged () {
        console.log('LIKE THIS MUSIC CHANGED')
        console.log(this.$store.state.likeThisMusic)
        if (this.likeThisMusic === true) {
          let thisMusic = Object.assign({}, this.currentMusicList[this.currentMusicIndex])
          // 将thisMusic对象push进用户的喜欢的歌曲的列表
        } else {
          // 取消喜欢一首歌相对较为复杂，应当以歌曲id作为标记。
          // 再用户喜欢的歌曲的列表中找到对应id歌曲并进行删除
        }
      },
      _handlePrivateSongListChanged () {

      },
      toggleLyrics () {
        console.log('TOGGLE LYRICS')
        //console.log(this.sentenceArray)
        this.showTheFuckingLyrics = !this.showTheFuckingLyrics
        let content = this.$refs.content
        content.style.top = '0px'
        this._holdOn(this.duringArray, 0)

        /*
        let style = content.children.forEach((pDom) => {
            return pDom.style
        })
        console.log(style)
        */
      },
      _holdOn (duringArray, index) {
        let content = this.$refs.content
        let self = this
        let duration = duringArray[index] * 1000
        if (duration === 0) {
          duration = 1
        }
        if (index + 1 < duringArray.length) {
          setTimeout(function () {
            let top = content.style.top.split('p')[0].toString()
            content.style.top = top - 30 + 'px';
            self.currentIndex += 1
            self._holdOn(duringArray, index + 1)
          }, duration)
        }
      }
    },
    watch: {
      /*
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
      },
      */
      playMode () {
        this._handlePlayModeChanged()
      },
      likeThisMusic () {
        this._handleLikeThisMusicChanged()
      },
      privateSongList () {
        this._handlePrivateSongListChanged()
      },
      currentMusicPictureSrc (newVal, oldVal) {
        let url = "url('" + newVal + "')"
        this.$refs.blur.style.backgroundImage = url
        //this.$refs.lyricsPage.style.backgroundImage = url
      }
    }
  }
</script>


<style scoped>
  .music-player {
    width: 100%;
    height: 90%;
    //display: flex;
    //background-color: cornsilk;
    //z-index: 50;
  }
  .blur {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    filter: blur(15px);
    z-index: -100;
    opacity: 0.8;
    background-position: center top;
    background-size: cover;
    background-repeat:no-repeat;
    background-attachment: fixed;
    background-color: gray;
    height: 100%;
    width: 100%;
  }
  .mid {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .music-album-picture {
    width: 72%;
    height: auto;
    border-radius: 50%;
    -webkit-animation:circle 12s infinite linear;
    border: 2px ridge beige;
  }
  @-webkit-keyframes circle{
    0%{ transform:rotate(0deg); }
    100%{ transform:rotate(-360deg); }
  }
  .lyrics-page {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 63%;
    //z-index: 100;
  }
  .lyrics-wrapper {
    position: absolute;
    left: 10%;
    width: 80%;
    height: 80%;
    //background-color: rgba(165,58,98,0.3);
    top: 10%;
    overflow: auto;
  }
  .lyrics-content {
    scroll: no;
    position: absolute;
    //background-color: rgba(87,63,187,0.3);
    top: 0;
    width: 100%;
  }
  .scroll {
    animation: marquee 0.3s linear ;
    -webkit-animation: marquee 0.3s linear ;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .lyrics-row {
    width: 100%;
    font-size: 17px;
    color: #ccc;
    text-align: center;
    line-height: 30px;
    //padding: 3px 0;
  }
  .current-row {
    color: beige;
  }
  @keyframes marquee {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-24px);
    }
  }
</style>
