<template>
  <div class="personalized-slide">
    <div class="slider-wrap" @mouseover="pauseSlider" @touchstart="pauseSlider" @touchmove="pauseSlider"
                              @mouseout="continueSlider" @touchend="continueSlider">
      <transition-group tag="ul" name="swiper">
        <li v-for="(item, index) in imgSrcArray" v-show="index === showIndex" :key="index">
          <a :href="['http://music.163.com/#/playlist?id=' + item.id]">
            <img :src="item.url" class="pic"/>
          </a>
        </li>
      </transition-group>
    </div>
    <div class="index">
      <ul>
        <li v-for="(src, index) in imgSrcArray" @click="changeIndex(index)">
          {{ index + 1 }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        //defaultImgSrc:
        showIndex: 0,
      }
    },
    props: {
      imgSrcArray: {
        default: function () {
          return [
            require('../../assets/left.jpg'),
            require('../../assets/middle.jpg'),
            require('../../assets/right.jpg'),
          ]
        },
        type: Array,
      }
    },
    computed: {

    },
    created () {
      this.changeShowIndex()
    },
    methods: {
      changeShowIndex () {
        let self = this
        this.sliderInterval = setInterval(function () {
          if (self.showIndex < self.imgSrcArray.length - 1) {
            self.showIndex += 1
          } else {
            self.showIndex = 0
          }
        }, 4000)
      },
      pauseSlider () {
        console.log('暂停轮播图')
        let id = this.sliderInterval
        clearTimeout(id)
      },
      clicked () {
        console.log('cliked')
      },
      continueSlider () {
        console.log('继续轮播图')
        this.changeShowIndex()
      },
      changeIndex (index) {
        this.showIndex = index
      }
    },
  }
</script>


<style scoped>
  .personalized-slide {
    display: flex;
    justify-content: center;
    background-color: darkcyan;
  }
  .slider-wrap {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }
  .slider-wrap ul {
    //height: 100%;
    //width: 100%;
  }
  .slider-wrap ul li {
    position: absolute;
  }
  .slider-wrap ul li a {
    margin: 0;
  }
  .pic {
    height: 200px;
    width: 100%;
  }
  .swiper-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .swiper-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .swiper-enter {
    transform: translateX(100%);
  }
  .swiper-leave {
    transform: translateX(0);
  }
  .index {
    position: absolute;
    top: 180px;
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(66, 66, 66, 0.3);
  }
  .index ul {
    display: flex;
    justify-content: flex-end;
    height: 16px;
  }
  .index ul li {
    display: flex;
    margin: 0 2px;
    padding: 0 5px;
    font-size: 14px;
    line-height: 16px;
    color: beige;
    background-color: #666;
  }
</style>
