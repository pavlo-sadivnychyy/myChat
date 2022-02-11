import React, {useRef, useState} from 'react'
import './List.scss'
import {IoMdSearch} from "@react-icons/all-files/io/IoMdSearch";
import ChatItem from "./ChatItem";


function List(){

    const [searchInput, setSearchInput] = useState(true)
    const searchInputRef = useRef();
    const [activeMessages, setActiveMessages] = useState('All messages')


    function useOutsideElementClick(ref) {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setSearchInput(true);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }
    useOutsideElementClick(searchInputRef)

    return (
        <>
            <div className="content">
                <div className='chats-settings-container'>
                    <div className='chats-header'>
                        <p>List of team</p>
                        <button onClick={() => setSearchInput(false)}><IoMdSearch/></button>
                        <div ref={searchInputRef} className='search-input'  hidden={searchInput}>
                            <input placeholder="Search friend"/>
                            <div className='users-list'>
                            </div>
                        </div>

                    </div>
                    <div className='sorting-bar'>
                        <ul>
                            <li
                                className={activeMessages === 'All messages' ? 'active' : null}
                            >All Messages</li>
                            <li
                                className={activeMessages === 'Unread' ? 'active' : null}
                            >Unread</li>
                            <li
                                className={activeMessages === 'Important' ? 'active' : null}
                            >Important</li>
                        </ul>
                    </div>
                </div>
                <div className='chats-list-container'>

                            <div>
                                <ChatItem/>
                                <ChatItem/>
                                <ChatItem/>
                            </div>

                </div>
            </div>
        </>

    )
}
export default List;