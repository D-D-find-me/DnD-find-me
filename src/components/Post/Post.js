
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Comment from "../Comment/Comment";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { id } from "date-fns/locale";

const SinglePostPage = styled.div`
  background-image: url("wood.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  height:100%;
  width:100%
  min-width: 100%;
  display: flex;
  justify-content: center;
`;
const SinglePostDisplay = styled.div`
background-image: url("parchment2.jpg");
  min-height: 812px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  padding-top: 30px;
`;
const CommentArea = styled.textarea`
  min-width: 29vw;
  max-width: 29vw;
  min-height: 5vh;
  max-height: 10vh;
`;
const ContentArea = styled.div`

margin-top: 10px;
`;
const Title = styled.h2`
  margin: 0;
  font-family: "Press Start 2P", cursive;
`;
const Content = styled.p`
  font-family: "Ubuntu Mono", monospace;
  font-size: 20px;
`;
const ContentTextarea = styled.textarea`
  min-width: 29vw;
  max-width: 29vw;
  min-height: 10vh;
  max-height: 10vh;
  font-family: "Ubuntu Mono", monospace;
  font-size: 20px;
`;

const TitleInput = styled.input`
  font-size: 15px;
  font-family: "Press Start 2P", cursive;
`;
const Settings = styled.div`
  display: flex;
  justify-content: space-around;
  float: Center;
  margin: 15px;
`;
const AuthorInfo = styled.div`
  font-family: "Ubuntu Mono", monospace;
  font-size: 15px;
  color: black;
  height: 40px;
`;
const Zipcode = styled.span`
  font-family: "Ubuntu Mono", monospace;
`;
const Username = styled.span`
  float: left;
  margin-left: 10px;
`;
const Timestamp = styled.span`
  float: right;
  color: black;
  margin-right: 10px;
`;

const Edit = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
background-color: #eae0c2;
border-radius: 15px;
border: 2px solid #333029;
height: auto;
width: auto;
display: inline-block;
cursor: pointer;
color: black;
font-family: 'Press Start 2P', cursive;
font-size: 10px;
font-weight: bold;
padding: 12px 16px;
text-decoration: none;
text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;
`;
const Delete = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
background-color: #eae0c2;
border-radius: 15px;
border: 2px solid #333029;
height: auto;
width: auto;
display: inline-block;
cursor: pointer;
color: black;
font-family: 'Press Start 2P', cursive;
font-size: 10px;
font-weight: bold;
padding: 12px 16px;
text-decoration: none;
text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;
`;
const UpdateSettings = styled.div`
  display: flex;
  justify-content: space-between;
  width: 225px;
  height: 50px;
`;
const EditConfirm = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
background-color: #eae0c2;
border-radius: 15px;
border: 2px solid #333029;
height: auto;
width: auto;
display: inline-block;
cursor: pointer;
color: black;
font-family: 'Press Start 2P', cursive;
font-size: 10px;
font-weight: bold;
padding: 12px 16px;
text-decoration: none;
text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;
`;
const Cancel = styled.button`
box-shadow: 0px 1px 0px 0px #1c1b18;
background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
background-color: #eae0c2;
border-radius: 15px;
border: 2px solid #333029;
height: auto;
width: auto;
display: inline-block;
cursor: pointer;
color: black;
font-family: 'Press Start 2P', cursive;
font-size: 10px;
font-weight: bold;
padding: 12px 16px;
text-decoration: none;
text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;
`;
const Start = styled.button`
  box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
  border: 2px solid #333029;
  height: auto;
  width: 300px;
  display: inline-block;
  align-self: center;
  justify-content: center;
	cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	padding: 12px 16px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
    margin: 0 10px 10px 10px;
`

const Post = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [username, setUsername] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const { postId } = useParams();
  const history = useHistory();

  const getComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPost = async () => {
    try {
      const res = await axios.get(`/api/post/${postId}`);
      setTitle(res.data[0].title);
      setContent(res.data[0].content);
      setTimestamp(res.data[0].created_at);
      setUsername(res.data[0].username);
      setZipcode(res.data[0].zipcode);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const editPost = async () => {
    try {
      const res = await axios.put(`/api/post/${postId}`, {
        title,
        content,
        zipcode,
      });
      setTitle(res.data[postId - 1].title);
      setContent(res.data[postId - 1].content);
      setIsEditing(false);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/post/${id}`);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (postId) => {
    try {
      await axios.post(`/api/comments/${postId}`, { commentBody });
      getComments();
      setCommentBody("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      getComments();
    } catch (err) {
      console.log("err on deletecomment func, front end", err);
    }
  };

  const editComment = async (commentId, commentBody) => {
    try {
      const res = await axios.put(`/api/comments/${commentId}`, {
        commentBody,
      });
      setCommentBody(res.data);
      getComments();
    } catch (err) {
      console.log("err on editComment func, frontend", err);
    }
  };

  const changeComment = (e) => {
    setCommentBody(e.target.value);
  };
  const gameOn = (mappedComments) => {
    for (let i = 0; i < mappedComments.length; i++) {
      let message = axios
        .post("/api/text", {
          name: props.user.username,
          message: "Game starts in 15 min!!",
          id: mappedComments[i].commentor_id,
        })
        .then((res) => res.status(200).send(message))
        .catch((err) => console.log('Error on frontend text function', err));
    }
  };

  const canEdit = props.user.username === username;

  const mappedComments = comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        {...comment}
        getComments={getComments}
        deleteComment={deleteComment}
        editComment={editComment}
        changeComment={changeComment}
      />
    );
  });

  return (
    <SinglePostPage>
      
      <SinglePostDisplay>
        {props.user.dm ? <Start onClick={() => gameOn()}>Adventure Start</Start> :null}
        <div>
          {isEditing === true ? (
            <div>
              Change Title:
              <TitleInput
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              Change Content:
              <ContentTextarea
                placeholder="Your beautiful writing goes here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <br />
              Change Zipcode:
              <input
                placeholder="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          ) : (
            <ContentArea>
              
              <Title>{title}</Title>
              <Content>{content}</Content>
              <AuthorInfo>
                <Username>By: {username}</Username>
                <Zipcode>Zipcode: {zipcode}</Zipcode>
                <Timestamp>
                  {moment(timestamp).format("h:mm a MMM/DD/YY")}
                </Timestamp>
              </AuthorInfo>
              
            </ContentArea>
          )}
          {canEdit ? (
            <Settings>
              <Edit onClick={() => setIsEditing(true)}>Edit</Edit>
              {isEditing === true ? (
                <UpdateSettings>
                  <EditConfirm onClick={() => editPost()}>Confirm</EditConfirm>
                  <Cancel onClick={() => setIsEditing(false)}>Cancel</Cancel>
                </UpdateSettings>
              ) : null}
              <Delete onClick={() => deletePost(postId)}>Delete</Delete>
            </Settings>
          ) : null}
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <CommentArea
            placeholder="Give some feedback..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <EditConfirm onClick={() => addComment(postId)}>Add Comment</EditConfirm>
        </div>
        <br />
        <div>
          {mappedComments == 0 ? (
            <div>This post has no comments yet.</div>
          ) : (
            mappedComments
          )}
        </div>
      </SinglePostDisplay>
    </SinglePostPage>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Post);
