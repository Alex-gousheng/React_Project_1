import React, {Component} from 'react'
import { Form, Input, Button, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import {reqLogin} from "../../api/index";
import './css/login.less'
import logo from '../../static/imgs/logo.png'


@connect(
    state =>({isLogin:state.userInfo.isLogin}),
    {
        saveUserInfo:createSaveUserInfoAction,
    }
)
class Login extends Component{
    render(){
        const onFinish = async(values, err)=>{
            const {username,password} = values
            if (!err){
                let result = await reqLogin(username, password)
                const {status,msg,data} = result
                if (status === 0){
                    // 服务器返回的user信息和token交给redux管理
                    this.props.saveUserInfo(data)
                    // 跳转admin
                    this.props.history.replace('/admin')

                }else{
                    message.warning(msg,1)
                }
            }else{
                message.error("表单填写错误")
            }
        };
        const {isLogin} = this.props
        if (isLogin){
            return (
                <Redirect to='/admin/home'/>
            )
        }
        return (
            <div className="login">
                <header>
                    <img src={logo} alt=""/>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form onFinish={onFinish} className="login-form">
                        <Form.Item name="username" rules={[
                            { required:true, whitespace: true, message:"请输入用户名!"},
                            { min:5, message: '用户名不能小于5位'},
                            { max: 12, message: '用户名最多12位' },
                            { pattern:/^[a-zA-Z0-9_]+$/, message:"用户名必须是英文、数字或下划线组成"},
                        ]}>
                            <Input
                                prefix={<UserOutlined style={{color:'rgba(0, 0, 0, .25)'}}/>}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message:"请输入密码!"},
                            { min: 4, message:"密码不能小于4位"},
                            { max: 12, message:"密码最多12位"},
                        ]}>
                            <Input
                                prefix={<LockOutlined type="lock" style={{color:'rgba(0, 0, 0, .25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login

// export default connect(
//     state =>({isLogin:state.userInfo.isLogin}),
//     {
//         saveUserInfo:createSaveUserInfoAction,
//     }
// )(Login)
