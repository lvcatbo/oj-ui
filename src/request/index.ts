import userApi from './api/user';
import questionApi from './api/question'

export const api = {
  ...userApi,
  ...questionApi,
}

export default api;
