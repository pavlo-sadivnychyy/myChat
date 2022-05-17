import React from 'react';
import './FriendInfo.scss';
import {
   useEffect, useState,
} from 'reactn';
import img from '../../img/user.png';


function FriendInfo({ user, activeChat }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = []
    if(activeChat){
      if(activeChat?.user_info.length === 2){
        const friend = activeChat?.user_info.find((item) => item._id !== user._id);
        temp.push(friend)
        setData(temp);
      }else if(activeChat?.user_info.length > 2){
        setData(activeChat?.user_info)
      }
    }else{
      temp.push(user)
      setData(temp)
    }
  }, [activeChat]);

  return (
    <>
      {
        data.length === 1 ?
          <div className="info-container">
            <div className="profile-info">
              <div className="img-container">
                <div>
                  <img src={data[0]?.file ? data[0].file : img} alt="Avatar" style={{ width: '76px', height: '76px' }} />
                </div>
              </div>
              <div className="friend-name-container">
                <div>
                  <p className="name">{`${data[0]?.name} ${data[0]?.surname}`}</p>
                  <p className="place">New York, USA</p>
                </div>
              </div>
            </div>

            <div className="full-info">
              <div>
                <p className="header">
                  Nickname
                </p>
                <p className="value">
                  {`${data[0]?.nickname}`}
                </p>
              </div>
              <div>
                <p className="header">
                  Email
                </p>
                <p className="value">
                  {`${data[0]?.email}`}
                </p>
              </div>
              <div>
                <p className="header">
                  Phone number
                </p>
                <p className="value">
                  {`${data[0]?.phone_number}`}
                </p>
              </div>
              <hr />

              <div>
                <p className="header">
                  Date of birth
                </p>
                <p className="value">
                  {`${data[0]?.dob}`}
                </p>
              </div>
              <div>
                <p className="header">
                  Gender
                </p>
                <p className="value">
                  {`${data[0]?.gender}`}
                </p>
              </div>
              <div>
                <p className="header">
                  Languages
                </p>
                <p className="value">
                  {`${data[0]?.languages}`}
                </p>
              </div>
              <button>Show full profile</button>
              <hr />

            </div>
          </div>
          :
          <div className="info-container-group">
              <div className="members-header">Group members</div>
            {
              data.map((item) => (
                <div key={item._id} className='member-info'>
                    <div className='image'><img src={item.file}/></div>
                    <div className='info'>
                      <p className="name">{`${item.name} ${item.surname}`}</p>
                      <p className='nickname'>{`@${item.nickname}`}</p>
                    </div>
                </div>

              ))
            }
          </div>
      }
    </>
  );
}

export default FriendInfo;
