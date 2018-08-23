<template>
  <div class="music-controller">
    <div class="control-panel">
      <div class="play-mode control-unit" v-if="privateSongList" @click="changePlayMode">
        <i class="iconfont danqu" v-show="playMode === 0">&#xe606;</i>
        <i class="iconfont liebiao" v-show="playMode === 1">&#xe6f2;</i>
        <i class="iconfont suiji" v-show="playMode === 2">&#xe6f1;</i>
      </div>
      <div class="like-this-music  control-unit" v-else @click="toggleLikeThisMusic">
        <i class="iconfont dislike" v-show="!likeThisMusic">&#xe6ca;</i>
        <i class="iconfont like" v-show="likeThisMusic">&#xe628;</i>
      </div>
      <i class="iconfont shangyishou control-unit" @click="changeToPrevMusic">&#xe600;</i>
      <i class="iconfont bofang control-unit"  @click="togglePlayPause" v-show="isPlaying">&#xe602;</i>
      <i class="iconfont zanting control-unit"  @click="togglePlayPause" v-show="!isPlaying">&#xe768;</i>
      <i class="iconfont xiayishou control-unit" @click="changeToNextMusic">&#xe601;</i>
      <i class="iconfont xiangqing control-unit" @click="showMusicDetail">&#xe64d;</i>
      <div class="darken"></div>
    </div>
  </div>
</template>


<script>
  import store from 'store'
  import {mapState} from 'vuex'
  export default {
    created () {

    },
    methods: {
      togglePlayPause () {
        console.log('togglePlayPause')
        this.$store.commit('togglePlayPause')
      },
      changePlayMode () {
        console.log('changePlayMode')
        this.$store.commit('changePlayMode')
      },
      toggleLikeThisMusic () {
        console.log('toggleLikeThisMusic')
        this.$store.commit('toggleLikeThisMusic')
      },
      changeToNextMusic () {
        console.log('changToNextMusic')
        this.$emit('changeToNextMusic')
      },
      changeToPrevMusic () {
        console.log('changeToPrevMusic')
        this.$emit('changeToPrevMusic')
      },
      showMusicDetail () {
        console.log('showMusicDetail')
      },
    },
    computed: {
      ...mapState([
        'isPlaying',
        'likeThisMusic',
        'privateSongList',
      ])
    },
    watch: {

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
  .iconfont {
    font-family: "iconfont";
    font-size: 40px;
    color: beige;
    font-style: normal;
  }
  .iconfont:active {
    color: white;
  }
  .music-controller {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color: lightblue;

  }
  .control-panel {
    display: flex;
  }
  .control-unit {
    display: flex;
    align-items: center;
    margin: 15px;
  }
  .dislike, .like {
    font-size: 34px;
  }
  .like {
    color: indianred;
  }
  .darken {
    float: left;
    position: absolute;
    display: block;
    top: 73%;
    left: 0;
    width: 100%;
    height: 27%;
    background: linear-gradient(to bottom, #ccc, #000);
    background: -webkit-linear-gradient(to bottom, #ccc, #000);
    opacity: 0.4;
    z-index: -50;
  }
</style>
