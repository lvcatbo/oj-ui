import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
       path: '/',
       name: 'Index',
       component: () => import ('@/layout/DefaultLayout.vue'),
       meta: {
           title: '首页',
           keepAlive:false
       },
       children: [
           {
               path: '',
               name: 'Home',
               component: () => import('@/views/index.vue')
           },
       ]
   },
   {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    beforeEnter: (to, from, next) => {
      const {id} = useUserStore();
      if(id) {
        next({name: from.name || 'Index'});
      } else {
        next();
      }
    }
   },
   {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register.vue'),
   },
]

export default routes;
