import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddGame from '@/components/AddGame'
import EditGame from '@/components/EditGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/AddGame',
      name: 'AddGame',
      component: AddGame
    },
    {
      path: '/Edit-Game/:game_slug',
      name: 'EditGame',
      component: EditGame
    }

  ]
})
