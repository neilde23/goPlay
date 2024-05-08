import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Visitor from '@/views/Visitor.vue'
import Player from '@/views/Player.vue'
import Manager from '@/views/Manager.vue'
import About from '@/views/About.vue'
import Team from '@/views/Team.vue'
import Profile from '@/views/Profile.vue'

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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/team',
        name: 'Team',
        component: Team
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;