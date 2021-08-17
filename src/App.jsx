import React, { Component, createContext } from "react";
import {hot} from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from "./router/routes";
import { history, UserContext } from "@/statics"
import { userContext } from "./statics";



class App extends React.Component{
  render(){
    

    return(
        <userContext.Provider value={{ user: null }}>
            <Router history={history}>
                <Routes />    
            </Router>
        </userContext.Provider>
    );

    
  }
}


export default hot(module)(App);