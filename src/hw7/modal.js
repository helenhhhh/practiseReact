import React,{Component} from 'react';
import  './modal.css'

class Modal extends Component{
  constructor(props){
    super(props);
    this.state={isOpen:false};
  }
  openModal = ()=>{
    this.setState({isOpen:true});
  }
  closeModal = ()=>{
    this.setState({isOpen:false});
  }
  render(){
    const {buttonText="Open", cancelButtonText="Go Back", content='this is a Modal', width = '400px'} = this.props;
    const {isOpen} = this.state;
    const display_Modal = isOpen? "block":"none";
    const style_modal = {display:display_Modal };
    //const container = isOpen? "containerOpen" : "containerClose"


    return(
      <div >
        <p>this is a webpage</p>
        <button onClick={this.openModal}> {buttonText}</button>
        <div className="modal_container" onClick={this.closeModal} style ={style_modal }>
        <div className="modal" onClick={e=>e.stopPropagation()} style ={style_modal }>
          <div className="modalHeader">
            <p>Modal title</p>
            <button className="closeButton" onClick={this.closeModal}> &times;</button>
          </div>
          <div className="modalBody"> 
            <p>{content}</p>
          </div>
          <div className="modalFooter">
            <button className="backbtn" onClick={this.closeModal}>{cancelButtonText}</button>
          </div>
        </div>
        </div>
        
      </div>
    )
  }
}
export default Modal;