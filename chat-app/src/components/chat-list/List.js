import React, { useEffect, useRef, useState } from 'react';
import './List.scss';
import { IoMdSearch } from '@react-icons/all-files/io/IoMdSearch';
import { getDispatch, useGlobal } from 'reactn';
import axios from 'axios';
import ChatItem from './ChatItem';

function List({
  conversations,
  setConversations,
  activeUsers,
  activeChat,
  defineActiveChat,
  setTeamActive,
  activeTeam,
  getUsers,
  getAllUserConversations,
  setNotifications,
  notifications,
  allUsers,
}) {
  const [user] = useGlobal('user');
  const [searchInput, setSearchInput] = useState(true);
  const searchInputRef = useRef();
  const [activeMessages, setActiveMessages] = useState('All messages');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    getUsers();
  }, [searchInput]);

  useEffect(() => {
    if (activeTeam) {
      setActiveMessages('');
    }
  }, [activeTeam]);

  async function getAllUserImportantConversations() {
    try {
      await axios.get(`/conversations/important/${user._id}`)
        .then((res) => {
          if (res.status === 200) {
            setConversations(res.data);
          } else {
            getDispatch().openSnackbar({
              open: true,
              msg: 'Conversations not found',
              color: 'warning',
            });
          }
        });
    } catch (err) {
      if (err) console.log(err);
    }
  }

  function onSearch(value) {
    const activeUsers = allUsers.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(activeUsers);
  }

  function useOutsideElementClick(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchInput(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  useOutsideElementClick(searchInputRef);

  return (
    <div className="content">
      <div className="chats-settings-container">
        <div className="chats-header">
          <p>
            List of
            {activeTeam ? activeTeam.name : 'messages'}
          </p>
          <button onClick={() => setSearchInput(false)}><IoMdSearch /></button>
          <div ref={searchInputRef} className="search-input" hidden={searchInput}>
            <input onChange={(event) => onSearch(event.target.value)} placeholder="Search user" type="text" />
            <div className="users-list">
              <ul>
              {
                filteredUsers.map((item) => (
                  <li
                    key={item._id}
                    onClick={async () => {
                      axios.post('/conversations', { senderId: user._id, receiverId: item._id })
                        .then((res) => {
                          if (res.status === 200) {
                            defineActiveChat(res.data);
                            setActiveMessages('All messages');
                            getAllUserConversations();
                            setSearchInput(true);
                          } else {
                            getDispatch().openSnackbar({
                              open: true,
                              msg: 'Conversations not found',
                              color: 'warning',
                            });
                          }
                        });
                    }}
                  >
                    <p>{`${item.name} ${item.surname}`}</p>
                  </li>
                ))
              }
              </ul>
            </div>
          </div>

        </div>
        <div className="sorting-bar">
          <ul>
            <li
              className={activeMessages === 'All messages' ? 'active' : null}
              onClick={async () => {
                setTeamActive(null);
                setActiveMessages('All messages');
                getAllUserConversations();
              }}
            >
              All Messages
            </li>
            <li
              className={activeMessages === 'Unread' ? 'active' : null}
              onClick={ async () => {
                let temp = []
                setNotifications([])
                setActiveMessages('Unread');
                    if(notifications){
                        for(let i = 0; i < notifications?.length; i++){
                            await axios.get('conversations/byId/' + notifications[i])
                                .then((res) => {
                                    res.data.map((item) => temp.push(item))
                                })
                        }
                        setConversations(temp)
                    }

              }}
            >
              Unread
            </li>
            <li
              className={activeMessages === 'Important' ? 'active' : null}
              onClick={async () => {
                setTeamActive(null);
                setActiveMessages('Important');
                getAllUserImportantConversations();
              }}
            >
              Important
            </li>
          </ul>
        </div>
      </div>
      <div className="chats-list-container">
        {
                        conversations?.map((item) => (
                          <div
                            key={item._id}
                          >
                            <ChatItem
                              defineActiveChat={defineActiveChat}
                              activeUsers={activeUsers}
                              setTeamActive={setTeamActive}
                              activeChat={activeChat}
                              getConversations={getAllUserConversations}
                              item={item}
                            />
                          </div>
                        ))
                    }
      </div>
    </div>

  );
}
export default List;
