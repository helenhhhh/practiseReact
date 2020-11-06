import React from 'react';
import './hw2.css';
class Counter extends React.Component{
  constructor(){
    super();
    this.state={number :1};
  }
  addOne = ()=>{
    this.setState({number:this.state.number+1});
  };
  minusOne = ()=>{
    this.setState({number:this.state.number-1});
  };
  render(){
    return (
      <div>
      <div className= "main">
      <p className= "p">{this.state.number}</p>
      <button className= "button" onClick={this.addOne}>+</button>
      <button className= "button" onClick={this.minusOne}>-</button>
      </div>
      </div>
    )
  }
}
export default Counter;