import React from 'react';
import './style.css';

const Tag = props => {
  const {inputList} = props;
  console.log(`input list: ${inputList}`);
  return (
    <div className="tagBox">
      {
        inputList.map((input, index) => {
            return (
                <button className="tagItem">
                  {input.text}
                  <span
                    key={index}
                    className="glyphicon glyphicon-remove"
                    role="button"
                    id="close-btn"
                    onClick={()=>props.hidePill(input.id)}
                  >
                  </span>
                </button>
            )
        })
      }
    </div>

  )
}

export default Tag;