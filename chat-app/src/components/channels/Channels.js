import React from 'react'
import './Channels.scss'
import Teams from "./Teams";
import Groups from "./Groups";


function Channels() {

    return (
        <div className='chat-list-container'>
            <Teams />
            <Groups/>
        </div>
    )
}

export default Channels;