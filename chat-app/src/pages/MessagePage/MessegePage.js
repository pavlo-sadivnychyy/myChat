import React from 'react'
import './MessagePage.scss'
import Channels from "../../components/channels/Channels";
import List from '../../components/chat-list/List'
import FriendInfo from "../../components/profile-info/FriendInfo";
import Chat from "../../components/main-chat/Chat";
function MessagePage(){

    return (
        <div className='main-content'>
            <Channels/>
            <List/>
            <FriendInfo/>
            <Chat/>
        </div>
    )
}

export default MessagePage;