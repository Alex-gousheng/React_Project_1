import myAxios from "./myAxios";
import {BASE_URL} from '../config'
//登录请求
export const reqLogin = (username,password)=>myAxios.post(`${BASE_URL}/login`, {username, password})

//获取商品列表
export const reqCategoryList = ()=>myAxios.get(`${BASE_URL}/manage/category/list`)


//获取天气信息
// export const reqWeatherInfo = ()=>myAxios.get(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`)

export const reqAddCategory = ({categoryName})=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
export const reqUpdateCategory = ({categoryId,categoryName})=>myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})