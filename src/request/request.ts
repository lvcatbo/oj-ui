import axios, { AxiosError } from 'axios';
import { handleChangeRequestHeader, handleNetworkError, handleGeneralError } from './tools';



interface Response<T> {
  code: string
  message: string
  data: T
}

type ClearFn<T> = (data: Response<T>) => Response<T>

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
  clearFn?: ClearFn<T>
): Promise<[any, Response<T> | undefined]> => {
  return new Promise((resolve) => {
    axios.get(url, { params })
    .then(result => {
      let res: Response<T>;
      if (clearFn !== undefined) {
        res = clearFn(result.data);
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
  clearFn?: ClearFn<T>
): Promise<[any, Response<T> | undefined]> => {
  return new Promise(resolve => {
    axios.post(url,data)
    .then(result => {
      if(clearFn !== undefined) {
        resolve([null, clearFn(result.data)])
      } else {
        resolve([null, result.data as Response<T>])
      }
    })
    .catch(err => {
      resolve([err, undefined])
    });
  })
}
