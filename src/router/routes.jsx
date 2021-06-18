import React, { Component} from "react";
import { history } from '@/statics';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home, About } from "../screens";


export default function Routes() 
{
    return (
        <Router history={history}>
            <Switch>
                <Route exact path= "/" component={Home}></Route>
                <Route path="/about" component={About}></Route>
            </Switch>
        </Router>
    )
}