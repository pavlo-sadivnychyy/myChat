import React, { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { Formik } from 'formik';
import { BsPaperclip } from 'react-icons/bs';
import axios from 'axios';
import Message from '../Message/Message';
import { messageSchema } from '../../validation';

function Chat({
  messages, currentUser, activeChat, socket, setCurrentPage, setMessages
}) {
  const messRef = useRef();
  const chatRef = useRef(null);

  useEffect(() => {
    messRef.current?.scrollIntoView()
  }, [messages]);

  const onScroll = () => {
    if (chatRef.current) {
      const {scrollTop} = chatRef.current;
      if (scrollTop === 0) {
        setCurrentPage((prev) => prev + 1)
      }
    }
  };


  return (
    <div className="chat">
      <div className="messenger">
        <div onScroll={onScroll} ref={chatRef} className="message-container">
          {messages.map((item, key) => (
            <div key={key} >
              <Message item={item} own={item.sender === currentUser._id} />
              <div ref={messRef}/>
            </div>
          ))}
        </div>
        <div className="message-input">
          <Formik
            initialValues={{ message: '', file: null}}
            onSubmit={async (values) => {

              const type = values.file ? 'file' : 'text'

              const fd = new FormData();
              fd.append('conversationId', activeChat._id);
              fd.append('text', values.message);
              fd.append('sender', currentUser._id);
              fd.append('type', type);
              if(values.file){
                fd.append('file', values.file, values.file.name);
                fd.append('fileName', values.file.name);
              }
              await axios.post('/messages', fd, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const message = {
                sender: currentUser._id,
                text: values.message,
                type: type,
                conversationId: activeChat._id,
                conversation: activeChat,
                mimetype: values.file?.type,
                fileName: values.file?.name.toString(),
                file: values.file,
                user_info: activeChat.user_info
              }
              await socket.current.emit('sendMessage', message);
              setMessages(prev => [...prev, message])
              values.message = '';
              values.file = null;
            }}
            validationSchema={messageSchema}
          >
            {(props) => (
              <form className="form" onSubmit={props.handleSubmit}>
                <label className="custom-file-upload">
                  <input
                    hidden
                    name="file"
                    type="file"
                    placeholder="Type your languages"
                    onChange={(event) => {
                      props.setFieldValue('file', event.currentTarget.files[0]);
                      props.setFieldValue('message', event.currentTarget.files[0].name);
                    }}
                  />
                  <BsPaperclip />
                </label>
                <input
                  disabled={props.values.file !== null}
                  type="text"
                  placeholder="Type your message..."
                  name="message"
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <button data-testid="formSubmitButton" className='submit' type="submit">SEND</button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Chat;
