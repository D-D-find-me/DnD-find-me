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
            setTitle(res.data.title);
            setContent(res.data.content);
            setTimestamp(res.data.created_at);
            setUsername(res.data.username);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {        
        getPost();
        // getComments();
    }, []);

    const editPost = async () => {
        try {
            const res = await axios.put(`/api/post/${postId}`, { title, content });
            setTitle(res.data.title);
            setContent(res.data.content);
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

    const addComment = async () => {
        try {
            await axios.post(`/api/comments/${postId}`, {commentBody})
            getComments();
            setCommentBody('');
        } catch (err) {
            console.log(err);
        }
    };

    const canEdit = props.user.username === username;

    // const mappedComments = comments.map((comment) => {
    //     return (
    //         <Comment key={comment.id} {...comment}/>
    //     )
    // })

    return (
        <div>
            <div>
                <div>
                    <h3>{timestamp}</h3>
                    {props.isLoggedIn === true ?
                        <input
                            placeholder="Title"
                            value={title}
                            // onChange={e => setTitle(e.target.value)}
                        />
                        :
                        <h2>Title: {title}</h2>
                    }
                    <h4>By: {username}</h4>
                    {canEdit ?
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        :
                            null
                    }
                    
                </div>
                <div>
                {isEditing === true ?
                    <input
                        placeholder="Your beautiful writing goes here..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    :
                    <p>{content}</p>
                    }
                    <div>
                    {canEdit ?
                        <button onClick={() => deletePost(postId)}>Delete</button>
                        :
                        null
                    }
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
                    Comments will appear here.
                </div>
                <div>
                    <input
                        placeholder="Give some feedback..."
                        // value={commentBody}
                        // onChange={e => setCommentBody(e.target.value)}
                    />
                    <button>Add Comment</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Post);