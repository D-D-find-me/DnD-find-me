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
`
const SinglePostDisplay = styled.div`
    display: block;
    justify-content: space-around;
    text-align: center;
    width: 30vw;
    margin: 0 auto;
`
const CommentArea = styled.textarea`
    width: 30vw;
    height: 10vh;
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
                            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                            <br/>
                            Change Content:
                            <textarea placeholder="Your beautiful writing goes here..." value={content} onChange={e => setContent(e.target.value)} />
                            <br/>
                            Change Zipcode: 
                            <input placeholder="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                        </div>
                        :
                        <div>
                            <h2>{title}</h2>
                            <p>{content}</p>
                            <span>{zipcode}</span>
                        </div>
                    }
                    {canEdit ?
                            <div>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                                <button onClick={() => deletePost(postId)}>Delete</button>
                            </div>
                            :
                            null
                    }
                </div>
                <div>
                    <div>
                        {isEditing === true ?
                            <>
                                <button onClick={() => editPost()}>Update Post</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                            :
                            null
                        }
                    </div>
                </div>
                <div>
                    <h4>By: {username}</h4>
                    <h6>{moment(timestamp).format('h:mma MMM.DD.YY')}</h6>
                </div>
                <div>
                    {mappedComments}
                </div>
                <div>
                    <CommentArea
                        placeholder="Give some feedback..."
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                    <button onClick={() => addComment(postId)}>Add Comment</button>
                </div>
            </SinglePostDisplay>
        </SinglePostPage>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);