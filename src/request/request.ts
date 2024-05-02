import axios, { AxiosError } from 'axios';
import { handleChangeRequestHeader, handleNetworkError, handleGeneralError } from './tools';

interface IAnyObj {
  [index: string]: unknown
}


interface Response<T> {
  code: string
  message: string
  data: T
}

type Fn = (data: Response<any>) => unknown

axios.defaults.baseURL = '/api';

axios.interceptors.request.use(config => {
  config = handleChangeRequestHeader(config);
  return config;
})

axios.interceptors.response.use(res => {
  if(res.status !== 200)
    return Promise.reject(res.data);

  /**
   * 处理业务Error,直接抛出异常
   */
  handleGeneralError(res.data);
  return res;
},
  (err: AxiosError) => {
    handleNetworkError(err.response?.status || 0);
    return Promise.reject(err);
  }
)

export const Get = <T>(
  url:string,
  params: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, Response<T> | undefined]> => {
  return new Promise((resolve) => {
    axios.get(url, { params })
    .then(result => {
      let res: Response<T>;
      if (clearFn !== undefined) {
        res = clearFn(result.data) as unknown as Response<T>;
      } else {
        res = result.data as Response<T>;
      }
      resolve([null, res]);
    })
    .catch(err => {
      resolve([err, undefined]);
    })
  })
}

export const Post = <T>(
  url: string,
  data: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, Response<T> | undefined]> => {
  return new Promise(resolve => {
    axios.post(url,data)
    .then(result => {
      if(clearFn !== undefined) {
        resolve([null, clearFn(result.data) as unknown as Response<T>])
      } else {
        resolve([null, result.data as Response<T>])
      }
    })
    .catch(err => {
      resolve([err, undefined])
    });
  })
}
