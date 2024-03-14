// popup.js
import React from 'react';
import { MdClose } from 'react-icons/md';
import "./componentsStyles.css";
import "./popup.css";
import OrangeButton from "./OrangeButton";
import WhiteButton from "./WhiteButton";

function Popup(props) {
  const { trigger } = props;

  return trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        {/* Replace the close button with the MdClose icon */}
        <button className='close-btn' onClick={() => props.setTrigger(false)}>
          <MdClose />
        </button>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default Popup;
