import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import styled from 'styled-components'

const Homebackground = styled.div`
background-image: url("wood.jpg");
background-repeat: no-repeat;
background-attachment: fixed;
background-size: 100% 100%;
min-width: 100%;
`

const Subheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  color: white;
  -webkit-text-stroke: 1px black;
`
const Post = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #DFDFDF; */
  margin: auto;
  margin-top: 15px;
  background-image: url("parchment2.jpg");
  :hover{
    //changed the hover element to have a border and shadow - not attached to it tho <3
    border: 3px solid darkgray;
    box-shadow: 2px 2px 2px lightgray;
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

  const LoadingGif = styled.img `
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0px;
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
          <LoadingGif
            src="loading-gif.gif"
            alt="loading gif"
          />
        ) : (
          <ul style={{ listStyle: "none", padding: "0", margin: "0"}}>
            {posts.map((post, index) => (
              <Post>
                <Link style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} to={`/posts/${post.id}`} key={`${post.id}-${index}`}>
                  <PostContent>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDescription>{post.content}</PostDescription>
                    <AuthorInfo>
                      <Link to={`/profile/${post.adv_id}`} key={`${post.id}-${post.adv_id}`}>
                        <h4>By: {post.username}</h4>
                      </Link>
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
