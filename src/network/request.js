import axios from "axios"

//最终操作
export function request(config) {
    //1.创建axios的实例
      const instance = axios.create({
         baseURL: "http://123.207.32.32:8000",
         timeout: 1000
      })

      //2.axios的拦截器
      //2.1请求拦截器的作用
      instance.interceptors.request.use(config => {
         return config
      }, err => {

      })

      //2.2响应拦截
      instance.interceptors.response.use(res => {
         return res.data
      }, err => {
         console.log(err);
      })

      //3.发送真正的网络请求
     return instance(config)
}

export function newrequest(config) {
   const instance = axios.create({
      baseURL: "http://152.136.185.210:8000/api/w6"
   })
   return instance(config)
}