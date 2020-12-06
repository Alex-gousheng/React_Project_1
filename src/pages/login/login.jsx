import React, {Component} from 'react'
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './css/login.less'
import logo from './images/logo.png'

class Login extends Component{
    render(){
        return (
            <div className="login">
                <header>
                    <img src={logo} alt=""/>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <NormalLoginForm/>
                </section>
            </div>
        )
    }
}

const NormalLoginForm = ()=>{
    const onFinish = (values,e,err)=>{
        e.preventDefault()
        if (!err){
            console.log("Received values of form:",values)
        }else{
            console.log(err);
        }
    };
    return(
        <Form
            onFinish={onFinish} className="login-form"
            // initialValues={{
            //     username:'admin',//默认值
            // }}
        >
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
    );
}

export default Login
