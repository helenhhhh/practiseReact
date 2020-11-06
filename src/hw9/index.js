import React, { Component } from 'react';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { input:'' ,list:[], curId:0 }
  }
  hanlderChange = (e)=>{
    this.setState({input:e.target.value});
  }
  handlerSubmit = (e)=>{
    e.preventDefault();
    this.setState({list:[...this.state.list,{id:this.state.curId,message:this.state.input} ],input:'',curId:this.state.curId+1});
  }
  handleDelete = (id)=>{
    this.setState({ list: this.state.list.filter(ele=>ele.id !== id) })
  }
  render(){
    return(
      <div className="container">
        {this.state.list.map(text=>{
          return <div className='text-tile' key ={text.id}>{text.message} <button onClick={()=>this.handleDelete(text.id)}>X</button></div>
        })}
        <form onSubmit={this.handlerSubmit}>
          <input placeholder="please type" value={this.state.input} onChange={this.hanlderChange}></input>
        </form>
      </div>
    );
  }
}
export default App;