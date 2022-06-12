import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => console.log("Something goes wrong: ", err));

    axios
      .get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => console.log("Something goes wrong: ", err));
  }, [id]);

  const addComment = () => {
    newComment.length !== 0
      ? axios
          .post(
            "http://localhost:3001/comments",
            {
              body: newComment,
              PostId: id,
            },
            {
              headers: {
                accessToken: sessionStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              const commentToAdd = { body: newComment };
              setComments([...comments, commentToAdd]);
              setNewComment("");
            }
          })
      : alert("Comment can't be empty");
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.content}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <textarea
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}></textarea>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.length
            ? comments.map((comment, key) => {
                return (
                  <div key={key} className="comment">
                    {comment.body}
                  </div>
                );
              })
            : "No comments yet"}
        </div>
      </div>
    </div>
  );
};

export default Post;
