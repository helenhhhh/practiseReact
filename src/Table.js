import React from 'react';
import './Table.css';


class Td extends React.Component{
  render(){
    return <td> {this.props.id==='&nbsp;'?' ':this.props.id}</td>;  //怎么插入空格？？&nbsp;貌似不行 
  }
}
class Tr extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <tr>
        <Td id = {this.props.row[0]}/>
        <Td id = {this.props.row[1]}/>
        <Td id = {this.props.row[2]}/>
        <Td id = {this.props.row[3]}/>
        <Td id = {this.props.row[4]}/>
      </tr>
    );
  }
}

class Table extends React.Component{
  constructor(){
    super();
    this.state={row1:['&nbsp;','Knocky','Flor','Ella','Juan'],row2:['Breed','Jack Russell','StreetDog','Cocker Span'],
                  row3:['Age',16,9,10,5],row4:['Owner','Mother','Me','Me','Sister'], 
                  row5:['Eating Habits','Eats everyone\'s leftovers','Nibbles at food','Hearty eater','Will eat till he explodes']};
  }
  render(){

    return (
      <table className="Table">
        <Tr row={this.state.row1}/>
        <Tr row={this.state.row2}/>
        <Tr row={this.state.row3}/>
        <Tr row={this.state.row4}/>
        <Tr row={this.state.row5}/>
        </table>
    );
  }
}

export default Table;
