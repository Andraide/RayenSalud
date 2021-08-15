import React, { Component} from "react";
import { history } from '@/statics';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  ScrollToTop from "@/statics/ScrollToTop"
import { Home, About, Login } from "../screens";


export default function Routes() 
{
    return (
        <Router history={history}>
            <ScrollToTop>
                <div style={{ backgroundColor : 'red', width: '100vw', height: '100vh' }}>
                    <Route exact path= "/" component={Login}></Route>
                    <Route path="/about" component={About}></Route>
                </div>               
            </ScrollToTop>
        </Router>
    )
}