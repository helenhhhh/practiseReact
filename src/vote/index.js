import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home.js';
import "./App.css";
class App extends Component{
  render(){
    return(
      <BrowserRouter>
       <Route path='/' exact component={Home} />
      </BrowserRouter>    
    )
  }
}
export default App;