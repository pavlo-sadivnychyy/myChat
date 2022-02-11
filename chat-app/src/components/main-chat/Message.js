import img from "../../img/user.png";
import './Message.scss'
import moment from "moment";
import {useGlobal} from "reactn";
import {useEffect} from "react";
import axios from "axios";
import {useStateIfMounted} from "use-state-if-mounted";



function Message({item, own}){

    const [sender, setSender] = useStateIfMounted({})

    useEffect(async () => {
            await axios.get('/users/' + item?.sender)
                .then((res) => {
                    if(res.status === 200){
                        setSender(res.data)
                    }
                })

    },[item])

    const [user] = useGlobal('user')
    return(
        <div className="chat-container">
            <div className="chat-box chatContainerScroll">
                {
                    own ?
                        <>
                            <div className="chat-right">
                                <div className="chat-text">{item.text}</div>
                                <div className="chat-avatar">
                                    <img src={sender.file ? sender.file : img} alt="Retail Admin"/>
                                </div>
                            </div>
                            <div className='date-right'><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
                        </>
                        :
                        <>
                            <div className="chat-left">
                                <div className="chat-avatar">
                                    <img src={sender.file ? sender.file : img} alt="Retail Admin"/>

                                </div>
                                <div className="chat-text">{item.text}</div>
                                <p>{item.date}</p>
                            </div>
                            <div className='date-left'><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
                        </>
                }
            </div>
        </div>

    )
}

export default Message;