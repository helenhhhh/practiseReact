import React,{Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './login.js';
import Home from './home';
import Detail from './detail';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/:questionId' component={Detail} /> 
          </Switch>
      </BrowserRouter>     
     
    )
  }
}
export default App;