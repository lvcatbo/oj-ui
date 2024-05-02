import { Get, Post } from "../request";


interface Register {
  userAccount: string
  userPassword: string
  checkPassword: string
}

/**
 * 注册
 */
export const register = (data: Register) => {
  return Post<number>('user/register', {...data});
}

export function login(data: {userAccount: string, userPassword: string}) {
  return Post<User>('/user/login',{...data})
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return Get<User>('/user/get/login');
}

export default {
  register,
  login,
  getCurrentUser
}
