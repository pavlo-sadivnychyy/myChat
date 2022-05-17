import React from 'react';
import './Channels.scss';
import Teams from '../Teams/Teams';
import Groups from '../Groups/Groups';
import axios from "axios";
import {getDispatch, useGlobal} from "reactn";

function Channels({
  user,
  setTeams,
  setGroups,
  teams,
  groups,
  getConversationsOfActiveTeam,
  setTeamActive,
  defineActiveChat,
  allUsers,
  getUsers,
  activeTeam,
  activeChat,
  getGroups,
  getTeams
}) {
  return (
    <div className="chat-list-container">
      <Teams
        getTeams={getTeams}
        activeTeam={activeTeam}
        setTeams={setTeams}
        setTeamActive={setTeamActive}
        getConversationsOfActiveTeam={getConversationsOfActiveTeam}
        teams={teams}
      />
      <Groups
        user={user}
        getGroups={getGroups}
        activeChat={activeChat}
        setGroups={setGroups}
        getUsers={getUsers}
        allUsers={allUsers}
        defineActiveChat={defineActiveChat}
        groups={groups}
      />
    </div>
  );
}

export default Channels;
