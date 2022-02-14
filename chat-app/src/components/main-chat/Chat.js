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
              console.log(values.file?.name)
              await socket.current.emit('sendMessage', {
                sender: currentUser._id,
                text: values.message,
                type: type,
                conversationId: activeChat._id,
                conversation: activeChat,
                mimetype: values.file?.type,
                fileName: values.file?.name.toString(),
                file: values.file
              });
              updateMessages();
              values.message = '';
              values.file = null;
            }}
          >
            {(props) => (
              <form className="form" onSubmit={props.handleSubmit}>
                <label className="custom-file-upload">
                  <input
                    hidden
                    name="file"
                    type="file"
                    placeholder="Type your languages"
                    onChange={(event) => props.setFieldValue('file', event.currentTarget.files[0])}
                  />
                  <BsPaperclip />
                </label>
                <input
                  type="text"
                  placeholder="Type your message..."
                  name="message"
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <button className='submit' type="submit">SEND</button>
              </form>

            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Chat;
