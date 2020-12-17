import React, {Component} from 'react'
import { Menu } from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createSaveTitleAction} from "../../../redux/action_creators/menu_action";
import menuList from "../../../config/menu_config";
import logo from '../../../static/images/logo.png'
import './left_nav.less'

const { SubMenu } = Menu;
@connect(
    state=>({
        menus:state.userInfo.user.role.menus,
        username:state.userInfo.user.role.username
    }),
    {
        saveTitle:createSaveTitleAction
    }
)
@withRouter
class LeftNav extends Component{

    hasAuth = (item)=>{
        const{username,menus} = this.props
        console.log(this.props.menus)
        console.log(item)
        if (username === 'admin')return true
        else if (!item.children) {
            return menus.find((item1)=>{return item1 === item.key})
        }else if(item.children){
            return item.children.some((item2)=>{return menus.indexOf(item2.key) !==1})
        }
    }


    createMenu = (target)=>{
        return target.map((item)=>{
            if(this.hasAuth(item)){
                if (!item.children){
                    return (
                        <Menu.Item key={item.key} onClick={()=>{this.props.saveTitle(item.title)}}>
                            <Link to={item.path} style={{ textDecoration:'none'}}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else {
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                {item.icon}
                                    <span>{item.title}</span>
                            </span>
                            }
                        >
                            {
                                this.createMenu(item.children)
                            }
                        </SubMenu>
                    )
                }
            }
        })
    }

    render(){
        let {pathname} = this.props.location
        return (
            <div>
                <header className="nav-header">
                    <img src={logo} alt=""/>
                    <h1>商品管理系统</h1>
                </header>
                <Menu
                    selectedKeys={pathname.indexOf('product') !== -1 ? 'product':pathname.split('/').reverse()[0]}
                    defaultOpenKeys={pathname.split('/').splice(2)}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        )
    }
}

export default LeftNav