import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'
import store from "../redux/store";
import {createDeleteSaveUserInfoAction} from '../redux/action_creators/login_action'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout:4000,
})
//请求拦截器
instance.interceptors.request.use((config)=> {
    NProgress.start()
    //从redux中获取所保存的token
    const {token} = store.getState().userInfo
    if (token) config.headers.Authorization = 'atguigu_'+token
    const {method,data} = config
    if (method.toLowerCase() === 'post'){
        if (data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config
});
//相应拦截器
instance.interceptors.response.use(
    (response)=>{
    NProgress.done()
    return response.data
},(error) => {
    NProgress.done();
    if (error.response.status === 401){
        message.error('身份校验失败,请重新登录', 1)
        this.props.deleteUserInfo()
        store.dispatch(createDeleteSaveUserInfoAction())
    }else {
        message.error(error.message,1)
    }
    return new Promise(()=>{})
})


export default instance