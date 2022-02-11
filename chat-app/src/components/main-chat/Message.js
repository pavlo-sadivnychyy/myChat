import img from "../../img/user.png";
import './Message.scss'

function Message({own}){

    return(
        <div className="chat-container">
            <div className="chat-box chatContainerScroll">
                {
                    own ?
                        <>
                            <div className="chat-right">
                                <div className="chat-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                <div className="chat-avatar">
                                    <img src={img} alt="Retail Admin"/>
                                </div>
                            </div>
                            <div className='date-right'><p>12:33 pm</p></div>
                        </>
                        :
                        <>
                            <div className="chat-left">
                                <div className="chat-avatar">
                                    <img src={img} alt="Retail Admin"/>

                                </div>
                                <div className="chat-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                            </div>
                            <div className='date-left'><p>12:33 pm</p></div>
                        </>
                }
            </div>
        </div>

    )
}

export default Message;