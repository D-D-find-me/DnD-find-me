import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { connect } from 'react-redux';

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
            console.log(zipcode)
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
            console.log(res.data[postId - 1].title)
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
        <div>
            <div>
                <div>
                    
                    {isEditing === true ?
                        <div>
                            Change Title:
                            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                            <br/>
                            Change Content:
                            <input placeholder="Your beautiful writing goes here..." value={content} onChange={e => setContent(e.target.value)} />
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
                            </>
                            :
                            null
                        }
                    </div>
                </div>
                <div>
                    <h4>By: {username}</h4>
                    <h3>{timestamp}</h3>
                </div>
                <div>
                    {mappedComments}
                </div>
                <div>
                    <input
                        placeholder="Give some feedback..."
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                    <button onClick={() => addComment(postId)}>Add Comment</button>
                </div>
                <div>
                    {comments}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);