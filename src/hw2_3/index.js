import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route,withRouter, Redirect,Switch} from 'react-router-dom';


class Home extends Component{
  constructor(props){
    super(props);
    this.state={data:[], error:null}
  }
  componentDidMount(){
    axios.get('http://api.haochuan.io/oj/problems')
    .then(Response=>{
      this.setState({data:Response.data.questions});
    })
    .catch(error=>{
      this.setState({error});
    })
  }

  render(){
    if(!this.props.authenticated){
      return <Redirect to={{pathname:'/login'}} />
    }
    const{data,error}=this.state;
    if(error){
      return <div>this is an error</div>
    }
    return (
      <div>
        {data.map((item)=>{
          return (
              <button onClick={()=>{this.props.history.push(`/${item.id}`)}} key={item.id}>{item.title}</button>
          )
        })
      }
     </div>
    )
  }
  
}
class Detail extends Component{
  constructor(props){
    super(props);
    this.state={data:{}, error:null}
  }
  componentDidMount(){
    const id = this.props.match.params.problemId;
    axios.get('http://api.haochuan.io/oj/problems/'+id)
    .then(Response=>{
      this.setState({data:Response.data.question});
    })
    .catch(error=>{
      this.setState({error});
    })
  }
  render(){
    
   // console.log("in detial");
    //console.log(this.props);
    const str=JSON.stringify(this.state.data)
     if(this.state.error){
      return (
        <div>
          <div>there is an error</div>
          <button onClick={()=>this.props.history.push('/')}> back</button>
        </div>
      )
    }
    return(
      <div>
        <h3>Detail</h3>
        <div>{str}</div>
        <button onClick={()=>this.props.history.push('/')}> back</button>
      </div>
    )
  }
}



class Login extends Component{
  constructor(props){
    super(props);
    this.state={name:'',password:'',error:null,answer:{}};
  }
  componentDidMount(){
    const today =new Date();
    const month = today.getMonth()<10?"0"+(today.getMonth()+1):today.getMonth()+1;
    const pass = "" + today.getFullYear() +month +today.getDate()
    this.setState({answer:{name:'today', password: pass}});
  }
  handlePassword = (e)=>{
    this.setState({password:e.target.value});
  }
  handleSubmit =(e)=>{
    e.prebentDefault();
    const {name,password}= this.state;
    const user = { username : name, password: password};
    axios.post('http://api.haochuan.io/login',{user})
    .then(res=>{
      console.log("respose in handleSubmit");
      console.log(res.data);
      })
    .catch(error=>{
      this.setState({error});
    })

    if(name===this.state.answer.name && password=== this.state.answer.password){
      this.props.handleAuth();
    }else{
      alert("wrong username and password")
    }

    
  }
  handleUserName = (e)=>{
    this.setState({ name:e.target.value });
  }

  render(){
    console.log('*********8in login*********');
    console.log(this.state.answer);
    console.log(this.state);
    if(this.props.authenticated){
      return <Redirect to={{pathname:'/'}} />;
    }
    const {name, password}=this.state;
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
    )
  }
}

const WithHome = withRouter(Home);
const WithDetail = withRouter(Detail);

class App extends Component{
  constructor(props){
    super(props);
    this.state={authentication: false};
  }
  componentDidMount(){
    //var authenticated = localStorage.getItem('authentication')==='true';  ////here for local storage?
   // this.setState ({authentication:authenticated});
  }
  handleAuth=()=>{
    this.setState({authentication:true});
    localStorage.setItem('authentication:', this.state.authentication); //localstorage 这么用的吗？
  }
  render(){
    console.log("in app**********");
    console.log(localStorage);
    const{authentication}= this.state;
    return(
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' render={()=><WithHome  authenticated={authentication}/>}/>
          <Route exact={true} path='/login' render={()=><Login authenticated={authentication} handleAuth={this.handleAuth}/>}/>
          <Route exact={true} path='/:problemId' render={()=><WithDetail authenticated={authentication}/>}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;