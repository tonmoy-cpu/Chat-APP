import React from 'react'
import { ChatBubbleLeftRightIcon, PhoneIcon} from "@heroicons/react/24/solid"


const customHeader = ({chat}) => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className='chat-header'>
        <div className='flexbetween'>
      <ChatBubbleLeftRightIcon className='icon-chat'/>
      <h3 className='header-text'>{chat.title}</h3>
      <button className='logout-button' onClick={refreshPage}>Logout</button>
        </div>
        <div className='flexbetween'>
         <PhoneIcon className='icon-phone'/>
         {chat.description!="⬅️ ⬅️ ⬅️"?(<p className='header-text'>{chat.description}</p>):
         <p className='header-text'>no chat selelcted</p>}
        </div>
    </div>
  )
}

export default customHeader