
import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
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
  width:100%;
  min-width: 100%;
  min-height: 90.9vh;
  display: flex;
  justify-content: center;
  `;
  const SinglePostDisplay = styled.div`
  background-image: url("parchment2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
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
margin-bottom: 20px;
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
  margin-left: 5px;
`;
const ZipcodeInput = styled.input`
font-family: "Ubuntu Mono", monospace;
  font-size: 20px;
  width: 200px;
  margin-left: 5px;
`
const TitleInput = styled.input`
  font-size: 15px;
  font-family: "Press Start 2P", cursive;
  width: 200px;
  margin-left: 5px;
`;
const Settings = styled.div`
  display: flex;
  justify-content: space-around;
  float: Center;
  margin: 15px;
`;
const AuthorInfo = styled.div`
  display: flex;
  font-family: "Ubuntu Mono", monospace;
  font-size: 18px;
  color: black;
  margin-bottom: 15px;
  height: 70px;
`;
  
const AuthorInfoContainer = styled.div `
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-itmes: center;
`

const Username = styled.div`
  display: flex;
  height: 20px;
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 10px;
  `;
  
  const TimestampContainer = styled.div `
  display: flex;
  flex-direction: column;
  width:90px;
  height: 50px;
  `
  
  const Timestamp = styled.div`
  display: flex;
  width:90px;
  color: black;
  margin-right: 10px;
  font-weight: 800;
  font-size: 15px;
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
`;
const Cancel = styled.button`
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
const EditDiv = styled.div`
display: flex;
justify-content: center;
margin: 10px;
`
const EditLabel = styled.label`
margin: 10px auto;
`
const EditInputs = styled.div`
height: 250px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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
  const gameOn = () => {
    const miniMessage = "Game starts soon!!"
    for (let i = 0; i < comments.length; i++) {
      let message = axios
        .post("/api/text", {
          name: props.user.username,
          message: miniMessage,
          id: comments[i].commentor_id,
        })
        .then((res) => res.status(200).send(message))
        .catch((err) => console.log('Error on frontend text function', err));
    }
  };

  return (
    <SinglePostPage>
      <SinglePostDisplay>
        {props.user.dm ? <Start onClick={() => gameOn()}>Adventure Start</Start> :null}
        <div>
          {isEditing === true ? (
            <EditInputs>
              <EditDiv>   
             <EditLabel>Change Title:</EditLabel>
              <TitleInput
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              </EditDiv>
              <EditDiv>
              <EditLabel>Change Content:</EditLabel>
              <ContentTextarea
                placeholder="Your beautiful writing goes here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              </EditDiv>
              <EditDiv>
              <EditLabel>Change Zipcode:</EditLabel>
              <ZipcodeInput
                placeholder="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              </EditDiv>
            </EditInputs>
          ) : (
            <ContentArea>
              <AuthorInfo>
                <AuthorInfoContainer>
                  <Username>By: {username}</Username>
                  <TimestampContainer>
                    <Timestamp>
                      {moment(timestamp).format("MMM/DD/YY")}
                    </Timestamp>
                    <Timestamp>
                      {moment(timestamp).format("h:mm a")}
                    </Timestamp>
                  </TimestampContainer>
                </AuthorInfoContainer>
              </AuthorInfo>
              
              <Title>{title}</Title>
              <Content>{content}</Content>
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
