// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import lazyLoad from 'vue-lazyload'

import './common/css/reset.css'

Vue.use(lazyLoad, {
  preLoad: 1.3,
  error: require('./assets/logo.png'),
  //error: require('./assets/middle.jpg'),
  loading: require('./assets/middle.jpg'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
