import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const { users } = useContext(AuthContext);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + users._id);
                setConversations(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getConversations();
    }, [users._id]);
    return (
        <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for Friends" className="chatMenuInput" />
                    {conversations.map((c) => (
                        <Conversation key={c._id} conversation={c} currentUser={users}/>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                </div>
            </div>
        </div>
        </>
    )
}
