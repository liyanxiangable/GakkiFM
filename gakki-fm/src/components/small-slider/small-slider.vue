<template>
  <div id="slider">
    <ul>
      <li v-for="(item, index) in list" >
        <img v-lazy="item">
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      list: {
        default: function () {
          return [
            require('../../assets/left.jpg'),
            require('../../assets/middle.jpg'),
            require('../../assets/right.jpg'),
          ]
        },
        type: Array,
      }
    }
  }
</script>


<style scoped>
  #slider {
    width: 100%;
    height: 130px;
    background-color: antiquewhite;
    overflow-x: auto;
    overflow-y: hidden;
  }
  #slider ul {
    position: relative;
    top: 3px;
    display: inline-block;
    height: 100%;
    width: auto;
    white-space: nowrap;
  }
  #slider ul::-webkit-scrollbar {
    display: none;
  }
  #slider ul li {
    height: 80%;
    margin: 10px;
    width: auto;
    display: inline-block;
  }
  #slider ul li img {
    height: 100%;
    border-radius: 10px;
  }
</style>
