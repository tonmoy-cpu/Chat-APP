import React from 'react'
import { useState } from 'react';
import MessageFormUi from './MessageFormUi'
import { usePostAiCodeMutation } from '@/state/api';
const AiCode = ({ props,activeChat }) => {
  const [message,setMessage] = useState("");
    const [attachment,setAttachment] = useState("");
    const [triggerCode] = usePostAiCodeMutation();
    const handleChange = (e) => setMessage(e.target.value);
    const handleSubmit = async() => {
    const date = new Date().toISOString().replace("T", " ").replace("Z",`${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{blob: attachment, file: attachment.name}] : [];
    const form = {
      attachments : at,
      created : date,
      sender_username : props.username,
      text : message,
      activeChatId: activeChat.id,
    }
    props.onSubmit(form);
    triggerCode(form);
    setAttachment("");
    setMessage("");
  }
  return (
    <MessageFormUi
    setAttachment={setAttachment}
    message={message}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
  />
  )
}


export default AiCode;