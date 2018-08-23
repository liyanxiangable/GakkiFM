<template>
  <div class="scroll-view">
    <div class="wrapper" ref="wrapper">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        contentDom: null,
        wrapperDom: null,
        wrapperHeight: 0,
        wrapperWidth: 0,
        contentHeight: 0,
        contentWidth: 0,
      }
    },
    props: {
      refName: {
        default: 'content',
        type: String,
      },
    },
    mounted () {
      console.log(this.refName)
      this.contentDom = this.$parent.$refs[this.refName]
      this.wrapperDom = this.$refs.wrapper
      this.wrapperHeight = this.wrapperDom.clientHeight
      this.wrapperWidth = this.wrapperDom.clientWidth
      this.contentHeight = this.contentDom.clientHeight
      this.contentWidth = this.contentDom.clientWidth
      console.log(this.wrapperHeight)
      console.log(this.wrapperWidth)
      console.log(this.contentHeight)
      console.log(this.contentWidth)
      this._setScrollOption()
    },
    methods: {
      _setScrollOption () {
        //this._setScrollDirection()
        let hasHorse = false
        let horse = 'horse'
        if (this.wrapperWidth < this.contentWidth) {
          console.log('SCROLL VIEW')
          let classes = this.contentDom.getAttribute('class')
          classes = classes.split(' ')
          for (let item in classes) {
            if (item === horse) {
              hasHorse = true
            }
          }
          if (!hasHorse) {
            classes.push(horse)
            classes = classes.join(' ')
            this.contentDom.setAttribute('class', classes)
          }
        }
      },
    },
  }
</script>


<style scoped>
  .wrapper {
    height: 100%;
    overflow: hidden;
    color: beige;
  }
  .horse{
    width:200px;
    -webkit-animation:horse 8s linear 0s infinite;
  }
  @-webkit-keyframes horse
  {
    0%   {transform: translateX(0)      translateY(0);}
    30%   {transform: translateX(0)      translateY(0);}
    65%  {transform: translateX(-50%)  translateY(0);}
    100% {transform: translateX(0)      translateY(0);}
  }
</style>
