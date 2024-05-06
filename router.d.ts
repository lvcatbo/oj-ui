import 'vue-router';

export {}

// https://router.vuejs.org/zh/guide/advanced/meta.html
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: RoleType[]
  }
 }
