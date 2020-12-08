import {SAVE_USER_INFO} from '../action_types'

let user = JSON.parse(localStorage.getItem('user'))
let token = localStorage.getItem('token')


let initState = {
    user:user || '',
    token:token || '',
    isLogin:user && token ? true : false
}
export default function loginReducer(preState=initState,action) {
    const {type,data} = action
    let newState
    switch (type){
        case SAVE_USER_INFO:
            newState = {user:data.user,token:data.token,isLogin:true}
            return newState
        default:
            return preState

    }
}