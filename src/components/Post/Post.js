import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

const SinglePostPage = styled.div`
    background-image: url("parchment.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100%;
    min-width: 100%;
    `
    const SinglePostDisplay = styled.div`
    min-height: 83.45vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 32vw;
    margin: 0 auto;
    padding-top: 30px;
    background-image: rgb(250, 242, 192);
`
const CommentArea = styled.textarea`
    min-width: 29vw;
    max-width: 29vw;
    min-height: 5vh;
    max-height: 10vh;
`
const ContentArea = styled.div`
`
const Title = styled.h2`
    margin: 0;
    font-family: 'Press Start 2P', cursive;
`
const Content = styled.p`
    font-family: 'Ubuntu Mono', monospace;
    font-size: 20px;
`
const ContentTextarea = styled.textarea`
min-width: 29vw;
max-width: 29vw;
min-height: 10vh;
max-height: 10vh;
font-family: 'Ubuntu Mono', monospace;
font-size: 20px;
`

const TitleInput = styled.input`
font-size: 15px;
font-family: 'Press Start 2P', cursive;
`
const Settings = styled.div`
display: flex;
justify-content: space-around;
float: Center;
margin: 15px;
`
const AuthorInfo = styled.div`
font-family: 'Ubuntu Mono', monospace;
font-size: 15px;
height: 40px
`
const Zipcode = styled.span`
    font-family: 'Ubuntu Mono', monospace;
`
const Username = styled.span`
    float: left;
    margin-left: 10px;
    `
const Timestamp = styled.span`
float: right;
margin-right: 10px;
`

const Edit = styled.button `
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    background-color: rgb(255, 237, 112);
    border: none;
    border-radius: 6px;
    height: 40px;
    width: 100px;
    :hover{
        border: solid 1px black;
    }
    :active{
        background-color: rgb(255, 255, 50);
    }
`
const Delete = styled.button `
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    background-color: rgb(230, 50, 50);
    border: none;
    border-radius: 6px;
    height: 40px;
    width: 100px;
    :hover{
        border: solid 1px black;
    }
    :active{
        background-color: rgb(255, 50, 50);
    }
`
const UpdateSettings = styled.div `
    display: flex;
    justify-content: space-between;
    width: 225px;
    height: 50px;
`
const EditConfirm = styled.button `
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    background-color: rgb(100, 237, 100);
    border: none;
    border-radius: 6px;
    height: 40px;
    width: 100px;
    :hover{
        border: solid 1px black;
    }
    :active{
        background-color: rgb(50, 255, 50);
    }
`
const Cancel = styled.button `
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    background-color: rgb(255, 150, 100);
    border: none;
    border-radius: 6px;
    height: 40px;
    width: 100px;
    :hover{
        border: solid 1px black;
    }
    :active{
        background-color: rgb(255, 50, 50);
    }
`

// const CommentInput = styled.div`
//     display: flex;
//     flex-direction: column;
// `

const Post = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [username, setUsername] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const { postId } = useParams();
    const history = useHistory();

    const getComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${postId}`)
            setComments(res.data);
        } catch (err) {
            console.log(err)
        }
    };

    const getPost = async () => {
        try {
            const res = await axios.get(`/api/post/${postId}`)
            setTitle(res.data[0].title);
            setContent(res.data[0].content);
            setTimestamp(res.data[0].created_at);
            setUsername(res.data[0].username);
            setZipcode(res.data[0].zipcode)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {        
        getPost();
        getComments();
    }, []);

    const editPost = async () => {
        try {
            const res = await axios.put(`/api/post/${postId}`, { title, content, zipcode });
            setTitle(res.data[postId - 1].title);
            setContent(res.data[postId - 1].content);
            setIsEditing(false);
        } catch (err) {
            console.log(err)
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/post/${id}`);
            history.push('/home');
        } catch (err) {
            console.log(err);
        };
    };

    const addComment = async (postId) => {
        try {
            await axios.post(`/api/comments/${postId}`, {commentBody})
            getComments();
            setCommentBody('');
        } catch (err) {
            console.log(err);
        }
    };

    const canEdit = props.user.username === username;

    const mappedComments = comments.map((comment) => {
        return (
                <Comment key={comment.id} {...comment}/>
        )
    })

    return (
        <SinglePostPage>
            <SinglePostDisplay>
                <div> 
                    {isEditing === true ?
                        <div>
                            Change Title:
                            <TitleInput placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                            <br/>
                            Change Content:
                            <ContentTextarea placeholder="Your beautiful writing goes here..." value={content} onChange={e => setContent(e.target.value)} />
                            <br/>
                            Change Zipcode: 
                            <input placeholder="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                        </div>
                        :
                        <ContentArea>
                            <Title>{title}</Title>
                            <Content>{content}</Content>
                            <AuthorInfo>
                                <Username>By: {username}</Username>
                                <Zipcode>Zipcode: {zipcode}</Zipcode>
                                <Timestamp>{moment(timestamp).format('h:mm a MMM/DD/YY')}</Timestamp>
                            </AuthorInfo>
                        </ContentArea>
                    }
                    {canEdit ?
                            <Settings>
                                <Edit onClick={() => setIsEditing(true)}>Edit</Edit>
                                {isEditing === true ?
                                    <UpdateSettings>
                                        <EditConfirm onClick={() => editPost()}>Confirm</EditConfirm>
                                        <Cancel onClick={() => setIsEditing(false)}>Cancel</Cancel>
                                    </UpdateSettings>
                                    :
                                    null
                                }       
                                <Delete onClick={() => deletePost(postId)}>Delete</Delete>
                            </Settings>
                            :
                            null
                    }
                </div>
                <div>
                    <div>
                        
                    </div>
                </div>
                <div>
                    <CommentArea
                        placeholder="Give some feedback..."
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                    <button onClick={() => addComment(postId)}>Add Comment</button>
                </div>
                <br/>
                <div>
                    {mappedComments == 0 ? <div>This post has no comments yet.</div> : mappedComments }
                </div>
            </SinglePostDisplay>
        </SinglePostPage>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);
