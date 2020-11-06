import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route,withRouter, Redirect} from 'react-router-dom';

export class User extends Component{
  constructor(props){
    super(props);
    this.state={data:[], error:null, isLoading:false};
  }
  handleClick = (login)=>{
    return(
      <BrowserRouter>
          <Route path='/list/:{login}' component={UserDetail}/>
      </BrowserRouter>
    );
  }
  componentDidMount(){
    this.setState({isLoading:true});
    axios.get('https://api.github.com/users?per_page=100')
    .then(Response=>{
      this.setState({data:Response.data,isLoading:false});
    })
    .catch(error=>{this.setState({error})})
  }
  render(){
    if(!this.props.authentication){
      return <Redirect to={{pathname:'/login'}} />
    }
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
                <tr onClick={()=>{this.props.history.push(`/list/${login}`)}} key={id}>  
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
export class UserDetail extends Component{
  constructor(props){
    super(props);
    this.state ={detail:null, isLoading:false,error:null };
  }
  componentDidMount(){
    console.log("UserDetail")
    console.log(this.props);
    const name =this.props.match.params.name;
    axios.get('https://api.github.com/users/'+name)
    .then(Response=>{
      this.setState({detail:Response.data});
    })
    .catch(error=>{
      this.setState({error});
    })
  }

  render(){
    if(!this.props.authentication){
      return <Redirect to={{pathname:'/login'}} />
    }
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
    < button onClick={()=>{props.history.push('/list')}}>
      go back
    </button>
  )
}
const WithRouterButton = withRouter(Button);



