import img from "../../img/user.png";
import {IoIosMore} from "@react-icons/all-files/io/IoIosMore";
import React, {useRef, useState} from "react";
import './ChatItem.scss'



function ChatItem() {

    const [important, setImportant] = useState(true)

    const buttonRef = useRef(null);

    function useOutsideButtonClick(ref) {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setImportant(true);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
    }

    useOutsideButtonClick(buttonRef);


    return (
        <>
            <div className='chats'>

                <div className='chats-image'>
                    <img src={img} alt='Avatar' style={{borderRadius: '50%', width: '40px', height: '40px'}}/>
                </div>
                <div className='chats-data'>
                    <div className='first'>
                        <p>Pavlo Sadivnychyy</p>
                        <button onClick={(e) => {

                            setImportant(false)
                        }}><IoIosMore/></button>
                    </div>
                    <div className='second'>
                        <span>I send you a few files for ...</span>
                        <span>15:10 PM</span>
                    </div>
                </div>
                <div hidden={important} ref={buttonRef} className='important'>
                    <button>
                        Mark as important
                    </button><br/>
                    <button>
                        Delete chat
                    </button>
                </div>
                <div className='activity'/>
            </div>
        </>

    )
}

export default ChatItem;