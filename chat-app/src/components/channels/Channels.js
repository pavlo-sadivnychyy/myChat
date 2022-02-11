import React from 'react'
import './Channels.scss'
import Teams from "./Teams";
import Groups from "./Groups";


function Channels({getGroups, getTeams, teams, groups, getConversationsOfActiveTeam, setTeamActive, defineActiveChat, allUsers, getUsers}) {

    return (
        <div className='chat-list-container'>
            <Teams setTeamActive={setTeamActive} getConversationsOfActiveTeam={getConversationsOfActiveTeam} getTeams={getTeams} teams={teams}/>
            <Groups getUsers={getUsers} allUsers={allUsers} defineActiveChat={defineActiveChat} getGroups={getGroups} groups={groups}/>
        </div>
    )
}

export default Channels;