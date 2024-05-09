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
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/addQuestion/index.vue')
      },
      {
        path: 'updateQuestion/:id',
        name: 'updateQuestion',
        meta: {
          requiresAuth: true,
          roles: ['admin']
        },
        component: () => import('@/views/addQuestion/index.vue')
      },
    ]
   },
   {
    path: '/problems/:name',
    name: 'Problems',
    component: () => import('@/views/problems/index.vue'),
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
   {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
   }
]

export default routes;
