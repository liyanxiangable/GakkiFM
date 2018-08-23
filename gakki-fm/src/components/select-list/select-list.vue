<template>
  <div class="top-playlist-list wrapper">
    <ul class="content" >
      <li v-for="item in list" class="list-item">
        <a class="a" :href="['http://music.163.com/playlist?id=' + item.id]">
          <div class="item-pic">
            <img class="img" v-lazy="item.coverImgUrl"/>
          </div>
          <div class="item-text">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-description">
              <p>
                {{ item.description }}
            </p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
  import getRecommendChannel from 'api/getRecommendChannel'

  export default {
    data () {
      return {
      }
    },
    props: {
      list: {
        default: null,
        type: Array,
      }
    },
    computed: {

    },
    beforeCreate () {

    },
    mounted () {
      console.log(this.list)
    },
    watch: {
      personalized () {
        console.log(this.personalized)
      },
      djRecommend () {
        console.log(this.djRecommend)
      },
      topPlaylist () {
        console.log(this.topPlaylist)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 50%;
    // height: 300px;
    width: 100%;
    // background-color: beige;
    overflow: hidden;
  }
  .content {
    width: 100%;
    background-color: #444;
    overflow: hidden;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    height: 80px;
    width: 100%;
  }
  .list-item .a {
    display: flex;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: beige;
  }
  .list-item .item-pic {
    display: inline-block;
    height: 100%;
    width: 20%;
    text-align: center;
    line-height: 80px;
    vertical-align: middle;
  }
  .list-item .item-text {
    display: inline-block;
    width: 80%;
    flex-direction: column;
    margin: 0 5px 0 8px;
  }
  .list-item .item-text .item-name {
    height: 30%;
    width: 100%;
    font-size: 14px;
    line-height: 24px;
    // background-color: lightblue;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-item .item-text .item-description p{
    height: 70%;
    width: 100%;
    font-size: 12px;
    line-height: 18px;
    // background-color: coral;
    // white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
  .img {
    height: 70px;
    border-radius: 6px;
    margin: 5px;
  }
</style>
