import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";


class Admin extends Component{



    //在render中想实现跳转 最好使用<Redirect>
    render(){
        const {user,token,isLogin} = this.props.userInfo
        if (!isLogin){
            return <Redirect to='/login'/>
        }else{
            return (
                <div>Admin组件中->用户名是:{user.username}</div>
            )
        }
    }
}

export default connect(
    state =>({userInfo:state.userInfo}),
    {}
)(Admin)