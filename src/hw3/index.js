import React,{Component} from 'react';

import"./index.css";

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {time:0, start:false };
  
  }

  startTimer = ()=>{
    this.timer = setInterval(() => {
      this.setState({time:this.state.time+1})
    }, 1000);
    this.setState({start:true});
  };
  stopTimer = ()=>{
    clearInterval(this.timer);
    this.setState({start:false});
  }
  resertTimer = ()=>{
    this.setState({time:0});
  }

  render(){
    const{start,time} = this.state;
    return (
      <div className="container">
        <div className ="number">{time}</div>
        <div className="btn-group"> 
          <button onClick={!start?this.startTimer:this.stopTimer }>
            {start?'STOP':'START'}
          </button>
          <button onClick={this.resertTimer}>RESET</button>
        </div>
      </div>

      
    );
    
  }
  }

export default Timer;