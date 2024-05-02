import { message } from 'ant-design-vue';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export function handleChangeRequestHeader(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

/**
 *
 * @param errStatus 错误状态码
 * @description 处理网络错误
 * @returns void
 */
export const handleNetworkError = (errStatus: number) => {
  let errMessage = '未知错误'
  if (errStatus) {
      switch (errStatus) {
          case 400:
              errMessage = '错误的请求'
              break
          case 401:
              errMessage = '未授权，请重新登录'
              break
          case 403:
              errMessage = '拒绝访问'
              break
          case 404:
              errMessage = '请求错误,未找到该资源'
              break
          case 405:
              errMessage = '请求方法未允许'
              break
          case 408:
              errMessage = '请求超时'
              break
          case 500:
              errMessage = '服务器端出错'
              break
          case 501:
              errMessage = '网络未实现'
              break
          case 502:
              errMessage = '网络错误'
              break
          case 503:
              errMessage = '服务不可用'
              break
          case 504:
              errMessage = '网络超时'
              break
          case 505:
              errMessage = 'http版本不支持该请求'
              break
          default:
              errMessage = `其他连接错误 --${errStatus}`
      }
  } else {
      errMessage = `无法连接到服务器！`
  }
  message.error(errMessage)
}


/**
 * @description 一般错误处理
 * @param res
 */
export const handleGeneralError = (res: {code: number, data:any, message: string}) => {
  if (res.code != 0) {
      message.error(res.message)
      throw Error
  }
}

