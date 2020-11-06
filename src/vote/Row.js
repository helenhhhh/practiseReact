import React, { Component } from 'react';
import './Row.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';



class Row extends Component{
  constructor(props){
    super(props);
    this.state = { like:0, dislike:0 };
  }
  handleLike = ()=>{
    this.setState({ like:this.state.like+1 });
  }
  handleDislike = ()=>{
    this.setState({ dislike:this.state.dislike+1 });
  }
  render(){
    const {like, dislike } = this.state;
    return(
      <tr className="row">
        <td onClick={this.handleLike}><ThumbUpIcon color="primary"/>{ like }</td>
        <td onClick={this.handleDislike}><ThumbDownIcon color="primary"/>{ dislike }</td>
        <td>
          <a href={ this.props.link } target="_blank" >{ this.props.webName }</a>
          <div>{ this.props.text }</div>
        </td>
      </tr>
    )
  }
}

export default Row;