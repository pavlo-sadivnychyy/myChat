import React, {useEffect, useRef} from 'react'
import './Chat.scss'
import {Formik} from 'formik'
import Message from "./Message";
import {BsPaperclip} from "react-icons/bs";

function Chat(){


    const scrollRef = useRef();


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [])

    return(
        <div className='chat'>
            <div className='messenger'>

                <div className='message-container'>
                            <div  ref={scrollRef}>
                                <Message/>
                                <Message/>
                                <Message/>
                            </div>
                </div>
                <div className='message-input'>
                    <Formik
                        initialValues={{message: ''}}
                        onSubmit={(values,) => {
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