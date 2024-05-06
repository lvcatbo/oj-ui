import { Get, Post } from "../request";

/**
 * 注册
 */
export const register = (data: Register) => {
  return Post<number>('user/register', {...data});
}

export function login(data: {userAccount: string, userPassword: string}) {
  return Post<User>('/user/login',{...data}, res => {
    if(typeof res.data.userRole === 'string') {
      res.data.userRole = (res.data.userRole as any).split(',')
    }
    return res
  })
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return Get<User>('/user/get/login', {}, (res) => {
    if(typeof res.data.userRole === 'string') {
      res.data.userRole = (res.data.userRole as any).split(',')
    }
    return res
  });
}

export default {
  register,
  login,
  getCurrentUser
}
