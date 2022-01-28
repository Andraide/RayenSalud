import React, { Component} from "react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  ScrollToTop from "@/statics/ScrollToTop"
import { Login, SignUp, Explore } from "../screens";


export default function Routes() 
{
    return (
            <Switch>                  
                <Route exact path= "/" component={Login}></Route>
                <Route path="/SignUp" component={SignUp}></Route>
                <Route path="/Explore" component={Explore}></Route>
            </Switch>
    )
}
