import React from 'react';
import './Channels.scss';
import Teams from './Teams';
import Groups from './Groups';

function Channels({
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
  activeChat
}) {
  return (
    <div className="chat-list-container">
      <Teams
        activeTeam={activeTeam}
        setTeams={setTeams}
        setTeamActive={setTeamActive}
        getConversationsOfActiveTeam={getConversationsOfActiveTeam}
        teams={teams}
      />
      <Groups
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
