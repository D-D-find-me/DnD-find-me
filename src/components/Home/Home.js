import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Home = () => {
const [posts, updatePosts] = useState([]);

useEffect(() => {
    const getPosts = async () => {
        try {
            const res = await axios.get('/api/post')
            updatePosts(res.data)
        } catch(err){
            console.log('err on getposts func, frontend', err)
        }
    }
    getPosts();
}, [])

const mappedPosts = posts.map(post => {
    return <div key={post.id}><h4>Title:</h4> {post.title} <br/><h6>by: {post.username}</h6><h4>Content:</h4> {post.content}</div>
})

    return (
        <div>
            {mappedPosts}
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);