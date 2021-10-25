import "./message.css"

export default function Message({own}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={PF + "/post/3.jpeg"} className="messageImg" alt="" />
                <p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima, facilis est recusandae voluptate ullam libero sapiente sed temporibus vero iure quidem necessitatibus molestias error accusantium, neque assumenda unde aut!</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}
