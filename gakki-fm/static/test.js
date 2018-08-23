/**
 * Created by liyanxiang on 2017/10/11.
 */
let aDom = document.getElementById('a');
aDom.addEventListener('touchstart', function (event) {
  console.log('%cON TOUCH START:', 'font-size: 20px')
  console.log(event)
  console.log(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
})
aDom.addEventListener('touchmove', function (event) {
  console.log('%cON TOUCH MOVE:', 'font-size: 20px')
  console.log(event)
  console.log(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
})
aDom.addEventListener('touchend', function (event) {
  console.log('%cON TOUCH END:', 'font-size: 20px')
  console.log(event)
  console.log(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
})
