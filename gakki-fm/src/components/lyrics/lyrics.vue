<template>
  <div class="wrapper">
    <div class="content" @click="hiddenLyrics"></div>
  </div>
</template>


<script>
  export default {
    methods: {
      hiddenLyrics () {
        this.$emit('hiddenLyrics')
      }
    }
  }
</script>


<style scoped>

</style>
