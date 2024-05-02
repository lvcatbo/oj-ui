import { defineStore } from 'pinia';
import api from '@/request';

const useUserStore = defineStore(
  'user',
  {
  state: (): User => ({
    id: undefined,
    userName: undefined,
    userAvatar: undefined,
  }
  ),

  persist: true,

  actions: {
    async login(data: {userAccount: string, userPassword: string}) {
      const [e,r] = await api.login(data);
      if(!e && r) {
        this.id = r.data.id;
        this.userName = r.data.userName;
        this.userAvatar = r.data.userAvatar;
        localStorage.setItem('userId', r.data.id?.toString() || '');
        return Promise.resolve(r.data);
      } else {
        return Promise.reject('未知错误')
      }
    }
  }
})

export default useUserStore;
