import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from "./router/routes";


class App extends React.Component{
  render(){
    

    return(
        <Routes />    
    );

    
  }
}


export default hot(module)(App);