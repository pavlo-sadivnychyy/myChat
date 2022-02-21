import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import React, { useEffect } from 'react';
import './Groups.scss';
import { getDispatch, useGlobal } from 'reactn';
import axios from 'axios';
import Modal from '../Modal/Modal';
import AddGroupForm from '../Forms/AddGroupForm';

function Groups({
  groups,
  setGroups,
  defineActiveChat,
  allUsers,
  getUsers,
  activeChat
}) {
  const [user] = useGlobal('user');

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    try {
      await axios.get(`/groups/${user._id}`)
        .then((res) => {
          if (res.status === 200) {
            setGroups(res.data);
          } else {
            getDispatch().openSnackbar({
              open: true,
              msg: 'Groups not found',
              color: 'warning',
            });
          }
        });
    } catch (err) {
      if (err) console.log(err);
    }
  }

  return (
    <div className="groups">
      <div className="groups-list-header">
        <p>Group channels</p>
        <button onClick={() => {
          Modal.open({
            component: (<AddGroupForm getUsers={getUsers} allUsers={allUsers} getGroups={getGroups} user={user} />),
            title: 'Add Group',
          });
        }}
        >
          <IoMdAdd />
        </button>
      </div>
      <ul className="groups-list">
        {
          groups?.map((opt) => (
            <li
              key={opt._id}
              onClick={() => {
                defineActiveChat(opt);
              }}
            >
              <p style={{color: activeChat?._id === opt._id ? 'white' : ''}}>
                #
                {opt.name}
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Groups;
