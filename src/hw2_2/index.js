import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route,Switch,withRouter, Redirect, Link} from 'react-router-dom';
import {User,UserDetail} from './User';

const WithUser = withRouter(User);
const WithUserDetail = withRouter(UserDetail);
class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
 render(){
  if(! this.props.authentication){
    return <Redirect to={{pathname:'/login'}} />
  }
  else{
    return (
    <div>
      Home page
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to ='/list'> UserList</Link>
            </li>
          </ul>
        </nav>
      </div>
        <Switch>
          <Route exact={true} path='/list' render={()=><WithUser authentication={this.props.authentication} />} />   
          <Route path='/list/:name' render={()=><WithUserDetail authentication={this.props.authentication}/>}/>  
        </Switch>
      </BrowserRouter>
      
    </div>
  )
  }

}
  
}


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {name:"", password:''};  
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const {name , password} = this.state;
    if(name==='username' && password==='password'){
       this.props.handleAut();
    }
    else{
      alert("wrong user name and password!");
    }
  }
  handleUserName= (e)=>{
    this.setState({name:e.target.value});
  }
  handlePassword= (e)=>{
    this.setState({password:e.target.value});
  }
  render(){
    const {name , password} = this.state;
    if(this.props.authentication){
      return (<Redirect to={{pathname:'/'}} />);
    }
    else{
      return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            username
          <input value={name} onChange={this.handleUserName}/>
          </label>
          <label>
            password
            <input type="password"  value={password} onChange={this.handlePassword} />
          </label>
            <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}
}
const WithRouterHome = withRouter(Home)

class App extends Component{
  constructor(props){
    super(props);
    this.state ={authentication : false};   //changing
  }
   handleClick =()=>{
    this.setState({authentication : true});
  }

  render(){
    return (

      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to ='/'> Home</Link>
            </li>
            <li>
              <Link to ='/login'>Login</Link>
            </li>
          </ul>
        </nav>
      </div>
        <Switch>
          <Route exact={true} path='/' render={()=><WithRouterHome authentication ={this.state.authentication} />}/>
          <Route path='/login' render={()=><Login authentication ={this.state.authentication} handleAut={this.handleClick}/>}/>   
          
        
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
