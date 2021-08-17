import React, { Component} from "react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  ScrollToTop from "@/statics/ScrollToTop"
import { Login, UserInfo, CarInfo, CarPhotos, Calendar, Resume } from "../screens";


export default function Routes() 
{
    return (
            <Switch>                  
                <Route exact path= "/" component={Login}></Route>
                <Route path="/UserInformation" component={UserInfo}></Route>
                <Route path="/CarInformation" component={CarInfo}></Route>
                <Route path="/CarPhotos" component={CarPhotos}></Route>
                <Route path="/Calendar" component={Calendar}></Route>
                <Route path="/Resume" component={Resume}></Route>
            </Switch>
    )
}
