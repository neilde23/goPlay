import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import SignIn from '@/views/SignIn.vue'
import Visitor from '@/views/Visitor.vue'



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
    }

  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
export default router;