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
}) {
  return (
    <div className="chat-list-container">
      <Teams
        setTeams={setTeams}
        setTeamActive={setTeamActive}
        getConversationsOfActiveTeam={getConversationsOfActiveTeam}
        teams={teams}
      />
      <Groups
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
