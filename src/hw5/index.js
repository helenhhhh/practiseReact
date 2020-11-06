import React,{Component} from 'react';
import './index.css' ;

const password={
  today : dateFormat(new Date()),
  yesterday : dateFormat(new Date(new Date().setDate(new Date().getDate()-1))),
  tomorrow : dateFormat(new Date(new Date().setDate(new Date().getDate()+1)))

}

function dateFormat(date){
  var month = date.getMonth()<10?"0"+(date.getMonth()+1):date.getMonth()+1;
  return ("" + date.getFullYear() +month +date.getDate());
}
const name = ["today","tomorrow","yesterday"]

class User extends Component{
  constructor(props){
    super(props);
    this.state={userName:'' ,login:false, pass:''};
  }
  handleUserName =(e)=>{
    this.setState({userName: e.target.value});
    
  }
  
  handlePassword =(e)=>{
    this.setState({pass: e.target.value});
    
  }

  handleSubmit =(e)=>{
    e.preventDefault();
    if(name.includes(this.state.userName) &&  this.state.pass === password[this.state.userName]){
      this.setState({login:true});
    }else{
      alert("wrong user name and password!")
    }
  }

  logOut=()=>{
    this.setState({login:false});
  }

  render(){
    const {login}= this.state;
    if(login){
      return(
      <div className='logout'>
        <div className ='outmessage'>you have been log in!</div>
        <button onClick={this.logOut}>logout</button>
      </div>
      );
    }else{
      return (
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <div className='input'>
              <div >
                <label>
                  username
                  <input
                    type="text"
                    onChange={this.handleUserName}
                    /> 
                </label>
              </div>
              <div>
                <label>
                    password
                  <input
                    type="text"
                    onChange={this.handlePassword}
                 /> 
                </label>
              </div>
              <div className='btn'>
                <input className='button' type="submit" value="Submit" />
              </div>
             </div>
          
          </form>
        </div>
        
      );
  }

  }
}
    


export default User;