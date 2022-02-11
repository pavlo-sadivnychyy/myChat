import React, { useEffect } from 'react';
import './Teams.scss';
import { MdPersonAdd } from '@react-icons/all-files/md/MdPersonAdd';
import axios from 'axios';
import { getDispatch, useGlobal } from 'reactn';
import Modal from '../Modal/Modal';
import AddTeamForm from '../Forms/AddTeamForm';

function Teams({
  teams,
  setTeams,
  getConversationsOfActiveTeam,
  setTeamActive,
}) {
  const [user] = useGlobal('user');

  useEffect(() => {
    getTeams();
  }, []);

  async function getTeams() {
    try {
      await axios.get(`/teams/${user._id}`)
        .then((res) => {
          if (res.status === 200) {
            setTeams(res.data);
          } else {
            getDispatch().openSnackbar({
              open: true,
              msg: 'Teams not found',
              color: 'warning',
            });
          }
        });
    } catch (err) {
      if (err) console.log(err);
    }
  }

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
                    teams?.map((opt, key) => (
                      <li
                        onClick={() => {
                          setTeamActive(opt);
                          getConversationsOfActiveTeam(opt);
                        }}
                        key={key}
                      >
                        <p>
                          #
                          {opt.name}
                        </p>
                        <p>{opt.conversations.length}</p>
                      </li>
                    ))
                }
      </ul>
    </div>
  );
}

export default Teams;
