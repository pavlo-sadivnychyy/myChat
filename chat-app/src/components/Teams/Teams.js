import React, { useEffect } from 'react';
import './Teams.scss';
import { MdPersonAdd } from '@react-icons/all-files/md/MdPersonAdd';
import axios from 'axios';
import { getDispatch, useGlobal } from 'reactn';
import Modal from '../Modal/Modal';
import AddTeamForm from '../Forms/AddTeamForm';

function Teams({
  teams,
  getTeams,
  getConversationsOfActiveTeam,
  setTeamActive,
  activeTeam
}) {

  useEffect(() => {
    getTeams();
  }, []);


  return (
    <div className="teams">
      <div className="teams-list-header">
        <p>Teams</p>
        <button onClick={() => {
          Modal.open({
            component: (<AddTeamForm getTeams={getTeams} />),
            title: 'Add Team',
          });
        }}
        >
          <MdPersonAdd />
        </button>
      </div>
      <ul className="teams-list">
        {
          teams?.map((opt) => (
            <li
              onClick={() => {
                setTeamActive(opt);
                getConversationsOfActiveTeam(opt);
              }}
              key={opt._id}
            >
              <p style={{color: activeTeam?._id === opt._id ? 'white' : ''}}>
                #
                {opt.name}
              </p>
              <p style={{color: 'white'}}>{opt.conversations?.length}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Teams;
