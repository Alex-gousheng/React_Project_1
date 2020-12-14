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

//请求商品分页列表
export const reqProductList = (pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//请求更新商品状态
export const reqUpdateProdStatus = (productId,status)=>myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})
//搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType, keyword)=>myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyword}})
//根据商品id获取商品信息
export const reqProdById = (productId)=>myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//根据图片名称删除图片
export const reqDeletePicStatus = (name)=>myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

