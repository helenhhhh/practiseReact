import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Detail extends Component{
  constructor(props){
    super(props);
    this.state={ data:{} , input:'' };
  }
  componentDidMount(){
    if(localStorage.getItem("Auth") !== "true"){
        this.props.history.push('/login')
    }
    const id =this.props.match.params.questionId;
    axios.get('http://api.haochuan.io/oj/problems/'+id)
    .then(res=>{
      console.log(res);
      this.setState({data:res.data.question});
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    const {data:{title,id,content},input} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <div>Type your answer here</div>
      </div>
    )
  }
}
export default Detail;