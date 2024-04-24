import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import SignIn from '@/views/SignIn.vue'
import Visitor from '@/views/Visitor.vue'
import Player from '@/views/Player.vue'



const routes = [
    {
        path: '/',
        name: 'Visitor',
        component: Visitor
    },


    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },

    {
      path: '/player',
      name: 'Player',
      component: Player
    }

  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
export default router;