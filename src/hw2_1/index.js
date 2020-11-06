import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route,Switch,withRouter, Redirect} from 'react-router-dom';

const Home = () =>{
  return (
    <div>
      Home page
    </div>
  )
}
class User extends Component{
  constructor(props){
    super(props);
    this.state={data:[], error:null, isLoading:false};
  }
  componentDidMount(){
    console.log("User:")
    console.log(this.props);
    this.setState({isLoading:true});
    axios.get('https://api.github.com/users?per_page=100')
    .then(Response=>{
      this.setState({data:Response.data,isLoading:false});
    })
    .catch(error=>{this.setState({error})})
  }
  render(){
    const {isLoading,data}= this.state;
    const imgStyle = {width :50, height:50};
    return(
      <div>
        <h3>List</h3>
        {isLoading?<h2>is loading...</h2>:
          <>
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>username</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({id,login, avatar_url})=>{
              return(
                <tr key={id}>
                  <td>{id}</td>
                  <td>{login}</td>
                  <td><img style={imgStyle} src={avatar_url} alt={`${login} avatar`}/></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </>
        }
      </div>

    )
  }
}
class UserDetail extends Component{
  constructor(props){
    super(props);
    this.state ={detail:null, isLoading:false,error:null };
  }
  componentDidMount(){
    console.log("UserDetail")
    console.log(this.props);
    const name =this.props.match.params.login;
    axios.get('https://api.github.com/users/'+name)
    .then(Response=>{
      this.setState({detail:Response.data});
    })
    .catch(error=>{
      this.setState({error});
    })
  }

  render(){
    const {detail,isLoading}= this.state;
    return(
      <div>
        {isLoading?<p>is loading</p>:
          detail&&
          <>
          <div>name:{detail.name}</div>
          <div>location:{detail.location}</div>
          <div>following:{detail.following}</div>
          <div>follower:{detail.followers}</div>
          </>
        }
        <WithRouterButton />
      </div>
    )
  }
}


const Button = (props)=>{
  return(
    < button onClick={()=>{props.history.push('/users')}}>
      go back
    </button>
  )
}
const WithRouterButton = withRouter(Button);

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
    console.log(this.props);
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

class App extends Component{
  constructor(props){
    super(props);
    this.state ={authentication : false};
  }
   handleClick =()=>{
    this.setState({authentication : true});
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route path='/login' render={()=><Login authentication ={this.state.authentication} handleAut={this.handleClick}/>}/>
          <Route exact={true} path='/users' component={User}/>
          <Route path='/users/:login' component={UserDetail}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;