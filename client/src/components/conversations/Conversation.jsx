import React from './conversation.css'

export default function Conversation() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="conversation">
            <img src={PF + "/post/3.jpeg"} className="conversationImg" alt="" />
            <span className="conversationName">Bambang</span>
        </div>
    )
}
