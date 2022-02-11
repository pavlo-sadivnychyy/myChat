import React from 'react'
import './FriendInfo.scss'
import img from '../../img/user.png'
import {getDispatch, useEffect, useGlobal, useState} from "reactn";
import ime from "../../img/grapefruit-slice-332-332.jpg";
import axios from "axios";

function FriendInfo({user, activeChat}) {

    const [data, setData] = useState({});

    useEffect(() => {
        if(activeChat){
            const friendId = activeChat.members.find(id => id !== user._id)
            getFriendData(friendId)
        }else{
            setData(user)
        }
    }, [activeChat])


    async function getFriendData(id){
        try{
            await axios.get('/users/' + id)
                .then(res => {
                    if(res.status === 200){
                        setData(res.data);
                    }else{
                        getDispatch().openSnackbar({
                            open: true,
                            msg: "Couldn't get friend data",
                            color: "warning",
                        });
                    }

                })
        }catch (err){
            if(err) console.log(err)
        }
    }

    return (
        <div className='info-container'>
            <div className='profile-info'>
                <div className='img-container'>
                    <div>
                        <img src={data.file ? data.file : ime} alt='Avatar' style={{width: '76px', height: '76px'}}/>
                    </div>
                </div>
                <div className='friend-name-container'>
                    <div>
                        <p className='name'>{`${data?.name} ${data?.surname}`}</p>
                        <p className='place'>New York, USA</p>
                    </div>
                </div>
            </div>

            <div className='full-info'>
                <div>
                    <p className="header">
                        Nickname
                    </p>
                    <p className="value">
                        {`${data?.nickname}`}
                    </p>
                </div>
                <div>
                    <p className="header">
                        Email
                    </p>
                    <p className="value">
                        {`${data?.email}`}
                    </p>
                </div>
                <div>
                    <p className="header">
                        Phone number
                    </p>
                    <p className="value">
                        {`${data?.phone_number}`}
                    </p>
                </div>
                <hr/>

                <div>
                    <p className="header">
                        Date of birth
                    </p>
                    <p className="value">
                        {`${data?.dob}`}
                    </p>
                </div>
                <div>
                    <p className="header">
                        Gender
                    </p>
                    <p className="value">
                        {`${data?.gender}`}
                    </p>
                </div>
                <div>
                    <p className="header">
                        Languages
                    </p>
                    <p className="value">
                        {`${data?.languages}`}
                    </p>
                </div>
                <button>Show full profile</button>
                <hr/>


            </div>
        </div>
    )
}

export default FriendInfo;