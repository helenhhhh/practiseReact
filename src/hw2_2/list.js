import React, {Component} from 'react';
import axios from 'axios';
import './list.css'
import {BrowserRouter, Route,Switch,withRouter, Redirect, Link} from 'react-router-dom';
function List(props){
  const imageStyle = { width: 100, height: 100 };
  return (
  <tr onClick = {props.clickHandler}>
    <td>{props.id}</td>
    <td>{props.login}</td>
    <td>
      <img style={imageStyle} src={props.avatar_url} alt={props.avatar_url} />
    </td>
  </tr>
  );
}


class UserList extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], isLoadingList: false, error: "", detail:{}, isLoadingDetail: false};
  }
  clickHandler = (item,event)=>{
    this.setState({ isLoadingDetail: true });
    var userName = item.login;
    axios({ method: 'get', url:'https://api.github.com/users/'+userName})
      .then(response =>{
          this.setState({detail: response.data, isLoadingDetail: false});
      })
      .catch(err => {
        this.setState({ error: err });
      })
  }
  componentDidMount(){
    this.setState({ isLoadingList: true });
    axios({ method: 'get', url:'https://api.github.com/users?per_page=100'})
      .then(response => {
        this.setState({ data: response.data, isLoadingList: false });
      })
      .catch(err=>{
        this.setState({err});
      });
  }
  render(){
    if(!this.props.authentication){
      return <Redirect to={{pathname:'/login'}} />
    }
    const UserTable = (
      <div>
        <h3>List</h3>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item) => {
            return <List {...item } clickHandler={(e)=>this.clickHandler(item,e)} key={item.id} />;
          })}
        </tbody>
      </table>
      </div>
    );
    const {isLoadingList ,error,isLoadingDetail,detail} = this.state;
    const DetailTable = (
      <div>
        <h3>detail</h3>
        <div className ="detailcontext">
          {isLoadingDetail ?<div>Loading...</div> : Object.keys(detail).length!==0 && <Detail {...this.state.detail}/>}
        </div>
      </div>
    );
    const loadingUI = <div>Loading...</div>;
    const errorUI = <div>{this.error}</div>
    
    return (
      <div>
        {error!=="" && <div> {errorUI}</div>}
        <div className = "container">
          <div className ="list">{ 
          isLoadingList? loadingUI: UserTable 
          }</div>
          <div className ="detail"> { !isLoadingList && DetailTable}</div>
        </div>
      </div>
      );
  }
}
export default UserList;