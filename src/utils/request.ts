import axios from 'axios';
import { MessageBox } from 'element-ui';
import { ResetMessage } from '@/utils/resetMessage';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { requestHeaders } from '@/settings';
import { userChange } from '@/utils/index';
import { ssoAuth } from '@/api/plus';
const CancelToken = axios.CancelToken;

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // axios.createrequest timeout
  headers: Object.assign({}, requestHeaders)
});

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config);
    // do something before request is sent

    if (userChange()) {
      // let cancelFun = null;
      config.cancelToken = new CancelToken((c) => {
        // cancelFun = c;
      });
      //  用户登录状态变更不需要提示请求取消，且有提示刷新系统
      // cancelFun('取消');
    }
    if (store.getters.token) {
      config.headers['x-token'] = getToken(); //  项目中会用到
    }
    return config;
  },
  error => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    // console.log(res)

    // if the custom code is not 1, it is judged as an error.
    if (res.code !== 1) {
      ResetMessage({
        message: res.message || '错误',
        type: 'error'
      });
      //  未登录状态码
      if (res.code === -999) { //  -999 no login
        // to re-login
        MessageBox.confirm('您处于未登录状态，您可以取消停留再本页面，也可以重新登陆哦!', '确定登出', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetStatus').then(() => {
            // location.reload();
            const red_url = encodeURIComponent(window.location.origin);
            // console.log(red_url);
            ssoAuth({ redirect_uri: red_url }).then(res => {
              window.location.replace(res.data);
            }).catch(err => {
              console.log('ssoLogin error:', err);
            });
          });
        });
      }
      return Promise.reject(new Error(res.message || '错误'));
    } else {
      return res;
    }
  },
  error => {
    // console.log('err' + error); // for debug
    ResetMessage({
      message: error.message,
      type: 'error'
    });
    console.log(error + '', error);
    // 增加catch,return {}; 防止取消请求时，response.data 为undefined,接口数据处理没判断时控制台报错
    // catch函数会影响业务错误函数的回调使用
    // return Promise.reject(error).catch(() => { return {}; });
    return Promise.reject(error);
  }
);

export default service;
