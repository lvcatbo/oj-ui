import type { App } from 'vue';
import { useUserStore } from '@/store';

export const hasRole = (app: App) => {
  app.directive('hasRole', (el, binding) => {
    const userStore = useUserStore();
    const userRoles = userStore.userRole;
    const { value } = binding;
    const super_role = 'admin';

    if(value && Array.isArray(value) && value.length > 0) {
      // 如果Userroles 是string, 则转为数组
      const hasRole = userRoles?.some((role) => {
        return role === super_role || value.includes(role);
      });
      if(!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
    else {
      throw new Error('请传入角色数组');
    }
  })
}
