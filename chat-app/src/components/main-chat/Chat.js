import React, { useEffect, useRef } from 'react';
import './Chat.scss';
import { Formik } from 'formik';
import { BsPaperclip } from 'react-icons/bs';
import axios from 'axios';
import Message from './Message';

function Chat({
  messages, currentUser, activeChat, updateMessages, socket,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className="messenger">

        <div className="message-container">
          {messages.map((item, key) => (
            <div key={key} ref={scrollRef}>
              <Message item={item} own={item.sender === currentUser._id} />
            </div>
          ))}
        </div>
        <div className="message-input">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={async (values) => {
              const payload = {
                sender: currentUser._id,
                text: values.message,
                conversationId: activeChat._id,
                activeChat,
              };
              await axios.post('/messages', payload);
              await socket.current.emit('sendMessage', payload);
              updateMessages();
              values.message = '';
            }}
          >
            {(props) => (
              <form className="form" onSubmit={props.handleSubmit}>
                <button><BsPaperclip /></button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  name="message"
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <button type="submit">SEND</button>
              </form>

            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Chat;
