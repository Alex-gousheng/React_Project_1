import React, {Component} from 'react'
import {Button, Modal} from "antd";
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import {FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import dayjs from 'dayjs'
import {connect} from 'react-redux'
import './css/header.less'
import {createDeleteSaveUserInfoAction} from "../../../redux/action_creators/login_action";
import menuList from '../../../config/menu-config'

const { confirm } = Modal;

@connect(
    state=>({
        userInfo:state.userInfo,
        title:state.title
    }),
    {deleteUserInfo:createDeleteSaveUserInfoAction}
)
@withRouter
class Header extends Component{
    state={
        isFull:false,
        date:dayjs().format('YYYY年MM月DD日  HH:mm:ss'),
        title:''
    }
    fullScreen = ()=>{
        screenfull.toggle()
    }
    componentDidMount() {
        screenfull.on('change',()=>{
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        this.interval = setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年MM月DD日  HH:mm:ss')})
        }, 1000)
        this.getTitle()
    }
    UNSAFE_componentWillMount() {
        clearInterval(this.interval)
    }
    logOut = ()=>{
        setTimeout(() => {
            confirm({
                icon: <ExclamationCircleOutlined />,
                content: '是否退出当前账号',
                cancelText:'取消',
                okText:'确认',
                onOk:()=> {
                    this.props.deleteUserInfo()
                },
            });
        }, 200);
    }
    getTitle = ()=>{
        let pathKey = this.props.location.pathname.split('/').reverse()[0]
        let title = ''
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
                let tmp = item.children.find((citem)=>{
                    return citem.key === pathKey
                })
                if (tmp){
                    title = tmp.title
                }
            }else{
                if (pathKey === item.key){
                    title = item.title
                }
            }
        })
        this.setState({title})
    }

    render(){
        let {isFull} = this.state
        let {user} = this.props.userInfo
        return (
            <header className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullScreen}>
                        <Icon className="icon_screen" component={isFull ? FullscreenExitOutlined : FullscreenOutlined}/>
                    </Button>
                    <span className="username">欢迎,{user.username}</span>
                    <Button type="link" onClick={this.logOut}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {this.props.title || this.state.title}
                    </div>
                    <div className="header-bottom-right">
                        {this.state.date}
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
                        晴&nbsp;&nbsp;&nbsp;温度:2 ~ -5
                    </div>
                </div>
            </header>
        )
    }
}
export default Header