import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import SignIn from '@/views/SignIn.vue'
import Visitor from '@/views/Visitor.vue'
import Player from '@/views/Player.vue'

import Dashboard from '@/views/Dashboard.vue'

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
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;