import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from "./containers/login/login";
import Admin from "./containers/admin/admin";
import './App.less';

export default class App extends Component{
    render(){
        return (
            <div className="app">
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                </Switch>
            </div>
        )
    }
}