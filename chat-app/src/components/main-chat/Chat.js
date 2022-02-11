import React, {useEffect, useRef} from 'react'
import './Chat.scss'
import {Formik} from 'formik'
import Message from "./Message";
import {BsPaperclip} from "react-icons/bs";
import axios from "axios";
import {messageSchema} from "../../validation";

function Chat({messages, currentUser, activeChat, updateMessages, socket}){


    const scrollRef = useRef();


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return(
        <div className='chat'>
            <div className='messenger'>

                <div className='message-container'>
                    {
                        messages.map((item, key) =>(
                            <div key={key} ref={scrollRef}>
                                <Message item={item} own={item.sender === currentUser._id}/>
                            </div>
                        ))
                    }
                </div>
                <div className='message-input'>
                    <Formik
                        initialValues={{message: ''}}
                        onSubmit={async (values,) => {
                            const payload = {
                                sender: currentUser._id,
                                text: values.message,
                                conversationId: activeChat._id,
                                activeChat: activeChat
                            }
                            await axios.post('/messages', payload);
                            await socket.emit('sendMessage', payload)
                            updateMessages();
                            values.message = ''
                        }}
                    >
                        {props => (
                            <form className='form' onSubmit={props.handleSubmit}>
                                <button><BsPaperclip/></button>
                                <input type='text' placeholder='Type your message...' name='message' value={props.values.message} onChange={props.handleChange}/>
                                <button type="submit">SEND</button>
                            </form>

                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Chat;





//
// initialValues={{message: ''}}
// onSubmit={async (values,) => {
//     const payload = {
//         sender: currentUser._id,
//         text: values.message,
//         conversationId: activeChat._id,
//     }
//     console.log(payload)
//     console.log({conversation: activeChat, text: values.message, sender: currentUser})
//     await axios.post('/messages', payload);
//     socket.emit('new message', {conversation: activeChat, text: values.message, sender: currentUser})
//     updateMessages();
//     values.message = ''
// }}
// validationSchema={messageSchema}