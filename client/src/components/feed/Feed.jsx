import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profiles/"+ username)
        : await axios.get("posts/timeline/613ef0d4fb1ef12ec5bac3a8");
      setPosts(res.data);
    };
    fetchPost();
  }, [username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
