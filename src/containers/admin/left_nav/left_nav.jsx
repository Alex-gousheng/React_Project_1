import React, {Component} from 'react'
import { Menu } from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createSaveTitleAction} from "../../../redux/action_creators/menu_action";
import menuList from "../../../config/menu-config";
import logo from '../../../static/imgs/logo.png'
import './left_nav.less'

const { SubMenu } = Menu;
@connect(
    state=>({}),
    {
        saveTitle:createSaveTitleAction
    }
)
@withRouter
class LeftNav extends Component{


    createMenu = (target)=>{
        return target.map((item)=>{
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
        })
    }

    render(){
        return (
            <div>
                <header className="nav-header">
                    <img src={logo} alt=""/>
                    <h1>商品管理系统</h1>
                </header>
                <Menu
                    defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
                    defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
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