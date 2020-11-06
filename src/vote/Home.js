import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Row from "./Row.js";


class Home extends Component{
  constructor(props){
    super(props);
    this.state = { webName:"", text:"",link:"", addNew: false,id:3,
    list:[
      {id:1, web:"google", text:"a search website" , link:"https://www.google.com.hk/?client=safari&channel=iphone_bm"},
      {id:2,web:"Stack OverFlow", text:"Quetion Answer webSit", link:"https://stackoverflow.com"},
      {id:3, web:"React", text:"ReactJS tutorials", link:"https://react-bootstrap.github.io"}
    ]
  };
  }
  handleButton=()=>{
    this.setState({addNew: true })
  }
  handleWebName = (e)=>{
    this.setState({webName: e.target.value})
  }
  handleText = (e)=>{
    this.setState({text: e.target.value})
  }
  handleLink = (e)=>{
    this.setState({link: e.target.value})
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    this.setState({id:this.id+1,webName:"",text:"",link:"", addNew: false, list:[...this.state.list, {id:this.id+1,web:this.state.webName,text:this.state.text,link:this.state.link}]})
  }
  
  render(){
    const{webName, text, link, addNew, list} = this.state;
    return(
      <div className="container">
      <h2>Simple Voting App</h2>
        <div className="context">
          <div>please vote for your favorite website:</div>
          <table className="table">
          {
            list.map(ele=>{
              return(
                  <Row tr className="Trow" text={ele.text} link={ele.link} webName={ele.web}/>   
            )})
          }
           </table>
        <button  className="Addbtn" onClick={this.handleButton}> Add Your Favorite Website</button>
        </div >   
        {addNew &&
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label> webName:</label>
              <input value ={webName} onChange={this.handleWebName} /> 
              
              <label>discirbe:</label>
              <input value ={text} onChange={this.handleText} />
              
              <lable >Link:</lable>
              <input  value ={link} onChange={this.handleLink}/>
              
              <input type="submit" />
            </form>
          </div>
        }
    </div>
    )
    
    
  }
}
export default Home;