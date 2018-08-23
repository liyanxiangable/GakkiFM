<template>
  <div class="user">
    USER
  </div>
</template>


<script>
  import {PAGE_3} from 'js/const'
  export default {
    created () {
      //this.$store.commit('setPage', PAGE_3)
      console.log('切换到第 ' + this.$store.state.page + ' 页')
    }
  }

</script>


<style scoped>

</style>
