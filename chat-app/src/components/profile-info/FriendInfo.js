import React from 'react'
import './FriendInfo.scss'
import ime from "../../img/grapefruit-slice-332-332.jpg";


function FriendInfo() {

    return (
        <div className='info-container'>
            <div className='profile-info'>
                <div className='img-container'>
                    <div>
                        <img src={ime} alt='Avatar' style={{width: '76px', height: '76px'}}/>
                    </div>
                </div>
                <div className='friend-name-container'>
                    <div>
                        <p className='name'>Pavlo Sadivnychyy</p>
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
                        Pavlo
                    </p>
                </div>
                <div>
                    <p className="header">
                        Email
                    </p>
                    <p className="value">
                        Pavlo.sad1@gmail.com
                    </p>
                </div>
                <div>
                    <p className="header">
                        Phone number
                    </p>
                    <p className="value">
                       12345678
                    </p>
                </div>
                <hr/>

                <div>
                    <p className="header">
                        Date of birth
                    </p>
                    <p className="value">
                        12/07/1998
                    </p>
                </div>
                <div>
                    <p className="header">
                        Gender
                    </p>
                    <p className="value">
                        Male
                    </p>
                </div>
                <div>
                    <p className="header">
                        Languages
                    </p>
                    <p className="value">
                        English
                    </p>
                </div>
                <button>Show full profile</button>
                <hr/>


            </div>
        </div>
    )
}

export default FriendInfo;