import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Home extends Component{
  constructor(props){
    super(props);
    this.state={data:[], error:null}
  }
  componentDidMount(){
    if(localStorage.getItem("Auth") !== "true"){
      this.props.history.push('/login');
     }
    axios.get('http://api.haochuan.io/oj/problems')
    .then(Response=>{
      this.setState({data:Response.data.questions});
    })
    .catch(error=>{
      this.setState({error});
    })
  }

  render(){
    const{data,error}=this.state;
    if(error){
      return <div>this is an error</div>
    }
    return (
      <div>
        {data.map((item,id)=>{
          return (
                <div key={item.id}>
                <Link to={`/${item.id}`}>{item.title}</Link>
                </div>
          )
        })
      }
     </div>
    )
  }
}
export default Home;