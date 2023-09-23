import axios from "axios";

class HttpClient {
  request = null;

  constructor(options, interceptors) {
    // 创建axios实例
    this.request = axios.create(options);
    // 初始化拦截器
    this.interceptors(interceptors);
  }

  interceptors(options) {
    this.request.interceptors.request.use(
      (config) => {
        return options.UseRequest(config);
      },
      (error) => {
        return options.UseError(error);
      }
    );

    // 响应拦截器
    this.request.interceptors.response.use(
      // 请求成功
      (response) => {
        return options.UseResponse(response);
      },
      // 请求失败
      (error) => {
        return options.UseError(error);
      }
    );
  }
}

export default HttpClient;
