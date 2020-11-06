import React,{Component} from 'react';
import Modal from './modal';

class App extends Component{
  
  render(){
    return(
      <div >
        <Modal
      buttonText="Open"
      cancelButtonText="Go Back"
      content={'this is a Modal!'}
      width={400}
   />
      </div>
    )
  }
}
export default App;