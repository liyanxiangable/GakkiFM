<template>
  <div class="header-bar">
    <router-link :to="toLeft" tag="div" class="left-button" @click.native="leftChangePage">
      <i class="iconfont" v-show="leftButton === 'player'">&#xe610;</i>
      <i class="iconfont" v-show="leftButton === 'lists'">&#xe65b;</i>
      <i class="iconfont" v-show="leftButton === 'admin'">&#xe636;</i>
    </router-link>
    <div class="information">
      <scroll-view class="song-name" :refName="refName[0]">
        <div class="content-a" :ref="refName[0]">
          {{ songName }}
        </div>
      </scroll-view>
      <scroll-view class="singer-name" :refName="refName[1]">
        <div class="content-b" :ref="refName[1]">
          {{ singerName }}
        </div>
      </scroll-view>
      <!--
      <scroll-view class="song-name" :string="songName"></scroll-view>
      <scroll-view class="singer-name" :string="singerName"></scroll-view>
      -->
    </div>
    <router-link :to="toRight" tag="div" class="right-button" @click.native="rightChangePage">
      <i class="iconfont" v-show="rightButton === 'player'">&#xe610;</i>
      <i class="iconfont" v-show="rightButton === 'lists'">&#xe65b;</i>
      <i class="iconfont" v-show="rightButton === 'admin'">&#xe636;</i>
    </router-link>
  </div>
</template>


<script>
  import * as PAGES from 'js/const'
  import {mapState} from 'vuex'
  import ScrollView from 'components/scroll-view/scroll-view'
  export default {
    data () {
      return {
        refName: ['contentA', 'contentB']
      }
    },
    components: {
      ScrollView: ScrollView
    },
    computed: {
      songName () {
        return this.$store.state.currentMusicList.length !== 0 ? this.$store.state.currentMusicList[this.$store.state.currentMusicIndex].name : ''
      },
      singerName () {
        return this.$store.state.currentMusicList.length !== 0 ? this.$store.state.currentMusicList[this.$store.state.currentMusicIndex].song.artists[0].name : ''
      },
      leftButton () {
        let page = this.$store.state.page
        if (page === 1) {
          return 'lists'
        } else if (page === 2) {
          return 'player'
        } else {
          return 'player'
        }
      },
      rightButton () {
        let page = this.$store.state.page
        if (page === 1) {
          return 'admin'
        } else if (page === 2) {
          return 'admin'
        } else {
          return 'lists'
        }
      },
      toLeft () {
        let page = this.$store.state.page
        if (page === 1) {
          return '/channel-lists'
        } else if (page === 2) {
          return '/music-player'
        } else {
          return '/music-player'
        }
      },
      toRight () {
        let page = this.$store.state.page
        if (page === 1) {
          return '/user'
        } else if (page === 2) {
          return '/user'
        } else {
          return '/channel-lists'
        }
      },
      ...mapState([
        'page'
      ])
    },
    methods:{
      leftChangePage () {
        console.log('LEFT CLICK')
        let page = this.$store.state.page
        if (page === 1) {
          this.$store.commit('setPage', PAGES.PAGE_2)
        } else if (page === 2) {
          this.$store.commit('setPage', PAGES.PAGE_1)
        } else {
          this.$store.commit('setPage', PAGES.PAGE_1)
        }
      },
      rightChangePage () {
        console.log('RIGHT CLICK')
        let page = this.$store.state.page
        if (page === 1) {
          this.$store.commit('setPage', PAGES.PAGE_3)
        } else if (page === 2) {
          this.$store.commit('setPage', PAGES.PAGE_3)
        } else {
          this.$store.commit('setPage', PAGES.PAGE_2)
        }
      },
    }
  }
</script>


<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 431442 */
    src: url('//at.alicdn.com/t/font_431442_jppf9c8xpbucv7vi.eot');
    src: url('//at.alicdn.com/t/font_431442_jppf9c8xpbucv7vi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_431442_jppf9c8xpbucv7vi.woff') format('woff'),
    url('//at.alicdn.com/t/font_431442_jppf9c8xpbucv7vi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_431442_jppf9c8xpbucv7vi.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family: "iconfont";
    font-size: 30px;
    font-style: normal;
    color: beige;
  }
  .iconfont:active {
    color: white;
  }
  .header-bar {
    width: 100%;
    height: 10%;
    background-color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .information {
    display: inline-block;
    width: 70%;
    height: 100%;
  }
  .song-name {
    text-align: center;
    font-size: 21px;
    //margin: 4px 0;
    height: 60%;
  }
  .singer-name {
    text-align: center;
    font-size: 18px;
    //margin: 4px 0;
    height: 40%;
  }
  .content-a {
    display: inline-block;
    width: auto;
    height: 100%;
    font-size: 20px;
    line-height: 45px;
    white-space: nowrap;
  }
  .content-b {
    display: inline-block;
    height: 100%;
    width: auto;
    white-space: nowrap;
    line-height: 25px;
    font-size: 12px;
  }
  .left-button, .right-button {
    font-size: 16px;
    margin: 10px;
  }
</style>
