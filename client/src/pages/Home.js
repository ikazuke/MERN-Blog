import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [postList, setPostList] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((err) => console.log("Something goes wrong: ", err));
  }, []);

  return (
    <div className="grid-container">
      {postList?.map((post, key) => {
        return (
          <div id={key} key={key} className="post" onClick={() => history.push(`/post/${post.id}`)}>
            <b className="title">{post.title}</b>
            <div className="body">{post.content}</div>
            <div className="footer">{post.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
