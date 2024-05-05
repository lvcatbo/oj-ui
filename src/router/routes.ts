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
        component: () => import('@/views/questionList/index.vue')
      },
      {
        path: 'addQuestion',
        name: 'AddQuestion',
        component: () => import('@/views/addQuestion/index.vue')
      },
      {
        path: 'updateQuestion/:id',
        name: 'updateQuestion',
        component: () => import('@/views/addQuestion/index.vue')
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
