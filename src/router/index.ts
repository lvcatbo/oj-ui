// src/router/index.ts
import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const userId = userStore.id;
    const userRole = userStore.userRole;

    if (to.meta.requiresAuth) {
      if (to.meta.roles && to.meta.roles.length > 0 && userRole) {
        const hasRole = to.meta.roles.some(role => userRole.includes(role));
        hasRole ? next() : next({ path: '/403' });
      }
      else {
        userId ? next() : next({ name: 'Login' });
      }
    }
    else {
      next();
    }
}
);

export default router
