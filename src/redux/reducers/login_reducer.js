import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

let user = ''
try {
    if (localStorage.getItem('user')){
        user = JSON.parse(localStorage.getItem('user'))
    }
}catch (e) {
    console.log(e)
}
let token = localStorage.getItem('token')


let initState = {
    user:user || '',
    token:token || '',
    isLogin:!!(user && token)
}
export default function loginReducer(preState=initState,action) {
    const {type,data} = action
    let newState
    switch (type){
        case SAVE_USER_INFO:
            newState = {user:data.user,token:data.token,isLogin:true}
            return newState
        case DELETE_USER_INFO:
            newState = {user:'',token:'',isLogin:false}
            return newState
        default:
            return preState

    }
}