import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import MusicPlayer from '@/components/music-player/music-player'
import User from 'components/user/user'
import ChannelLists from 'components/channel-lists/channel-lists'
import Login from 'components/login/login'
import Register from 'components/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MusicPlayer
    },
    {
      path: '/music-player',
      component: MusicPlayer,
      props: true,
    },
    {
      path: '/user',
      component: User,
      beforeEnter: function (from, to, next) {
        if (!Store.state.isLogin) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/channel-lists',
      component: ChannelLists
    },
    {
      path: '/register',
      component: Register,
    }
  ]
})
