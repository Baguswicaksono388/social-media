import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation , currentUser }) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios.get("/users?userId=" + friendId);
                setUser(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img className="conversationImg" src={ user?.profilePicture ? PF + user.profilePicture : PF + "/post/3.jpeg"} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}