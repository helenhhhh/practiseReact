import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={ username:'', password:'' };
  }

  handleUser = (e)=>{
    this.setState({ username:e.target.value });
  }
  handlePassword = (e)=>{
    this.setState({ password:e.target.value});
  }
  handleSubmit =(e)=>{
    e.preventDefault();
    axios.post('http://api.haochuan.io/login',this.state)
    .then(res=>{
      console.log(res);
      localStorage.setItem('Auth',true);
      this.props.history.push("/");
    })
    .catch(err=>{
      console.log(err);
      alert('wrong username and password');
    })
    
  }

  render(){
    const { username, password } = this.state;
    return(
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor='user'> 
          username:
          <input  type="text" id="user" value={ username } onChange={ this.handleUser }/>
        </label>
        <br />
        <label htmlFor='password'>
          password:
          <input type="password" id="password" value={ password } onChange={ this.handlePassword }></input>
        </label>
        <br/>
          <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default Login;