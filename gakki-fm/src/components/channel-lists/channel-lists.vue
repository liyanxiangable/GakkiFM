<template>
  <div class="channel-lists">
    <big-slider :imgSrcArray="sliderImgSrc"></big-slider>
    <small-slider :list="djImgSrc"></small-slider>
    <select-list :list="topPlaylist"></select-list>
  </div>
</template>


<script>
  import {PAGE_2} from 'js/const'
  import BigSlider from 'components/big-slider/big-slider'
  import SmallSlider from 'components/small-slider/small-slider'
  import SelectList from 'components/select-list/select-list'
  import getRecommendChannel from 'api/getRecommendChannel'

  export default {
    data () {
      return {
        personalized: [],
        djRecommend: [],
        topPlaylist: [],
      }
    },
    beforeCreate () {
      getRecommendChannel().
      then(res => {
        this.lists = res
        this.personalized = res.personalized.result
        this.djRecommend = res.djRecommend.djRadios
        this.topPlaylist = res.topPlaylist.playlists
      })
    },
    created () {
      //this.$store.commit('setPage', PAGE_2)
      console.log('切换到第 ' + this.$store.state.page + ' 页')
    },
    components: {
      BigSlider,
      SmallSlider,
      SelectList,
    },
    computed: {
      sliderImgSrc () {
        return this.personalized.map(item => {
          return {
            url: item.picUrl,
            id: item.id
          }
        })
      },
      djImgSrc () {
        return this.djRecommend.map(item => {
          return item.picUrl
        })
      }
    }

  }
</script>


<style scoped>
  .channel-lists {
    width: 100%;
    position: absolute;
  }
</style>
