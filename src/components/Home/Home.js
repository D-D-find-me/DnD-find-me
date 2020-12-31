import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import styled from 'styled-components'

const Homebackground = styled.div`
background-image: url("stonewallpixel_home.jpg");
background-repeat: no-repeat;
background-attachment: fixed;
background-size: 100% 100%;
min-width: 100%;
`

const Subheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 20px;
  color: black;
`
const Post = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #DFDFDF;
  margin: auto;
  margin-bottom: 15px;
  background-image: url("parchment2.jpg");
  :hover{
    background-color: #b3b3b3;
  }
  `
  const PostContent = styled.div`
  width: 90%
  `
  const PostTitle = styled.h3`
  font-size: 15px;
  font-family: 'Press Start 2P', cursive;
  color: black;
  `
  
  const PostDescription = styled.span`
  margin-left: 15px;
  font-size: 18px;
  font-family: 'Ubuntu Mono', monospace;
  color: black;
  `

  const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  `

const Home = () => {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/api/post");
        updatePosts(res.data);
      } catch (err) {
        console.log("err on getposts func, frontend", err);
      }
    };
    getPosts();
  }, []);


  return (
    <Homebackground>
      <Subheader>
        <h1>Adventure Board</h1>
      </Subheader>
      <div className="posts">
        {posts.length < 1 ? (
          <img
            src="https://media0.giphy.com/media/eIZZQ7npNjfsqizTwO/200w.webp?cid=ecf05e47bu1ve49khspqx0bmsciosj5c47omlleqbtgjatas&rid=200w.webp"
            alt="loading gif"
          />
        ) : (
          <ul style={{ listStyle: "none", padding: "0"}}>
            {posts.map((post, index) => (
              <Post>
                <Link style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} to={`/posts/${post.id}`} key={`${post.id}-${index}`}>
                  <PostContent>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDescription>{post.content}</PostDescription>
                    <AuthorInfo>
                      <h4>By: {post.username}</h4>
                      <h6>Created at: {moment(post.created_at).format('h:mma MMM.DD.YY')}</h6>
                    </AuthorInfo>
                  </PostContent>
                </Link>
              </Post>
            ))}
          </ul>
        )}
      </div>
    </Homebackground>
  );
};
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
