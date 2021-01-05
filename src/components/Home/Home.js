import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    background-image: url("wood.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
`
const Subheader = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 22px;
  /* color: whitesmoke; */
  /* text-shadow: 0 3px 2px rgba(0, 0, 0, 0.6); */
  color: white;
  /* Keep this for Combination effect: */
  /* -webkit-text-stroke: 1px black;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; */
  /* Keep this for simulation effect: */
    text-shadow:
    -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  flex-direction: column;
  width: 100%;
  padding-bottom: 16px;
  padding-top: 20px;
`
const SearchBar = styled.input`
  font-size: 16px;
  text-decoration: none;
  font-family: 'Ubuntu Mono', monospace;
  width: 35%;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: 0;
  display: block;
  `
const PostFeed = styled.div`
  width: 70%;
  margin: 0 auto;
`
const Post = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background-image: url("parchment2.jpg");
  padding: 16px;
  :hover{
    //changed the hover element to have a border and shadow - not attached to it tho <3
    /* border: 3px solid darkgray;
    box-shadow: 2px 2px 2px lightgray; */
    filter: drop-shadow(0px 0px 5px white);
    }
  `
  const PostTitle = styled.h3`
    font-size: 13px;
    font-family: 'Press Start 2P', cursive;
    color: black;
    padding-bottom: 8px;
  `  
  const PostContent = styled.div`
    margin-left: 15px;
    font-size: 18px;
    font-family: 'Ubuntu Mono', monospace;
    color: black;
    padding-bottom: 8px;
  `
  const AuthorInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Ubuntu Mono', monospace;
    font-weight: bold;
    color: black;
    padding-top: 8px;
  `
  const LoadingGif = styled.img`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
  `
const Home = () => {
  const [posts, updatePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div>
      <GlobalStyle/>
      
      <div>
        {posts.length < 1 ? (
          <LoadingGif
            src="loading-gif.gif"
            alt="loading gif"
          />
        ) : (
          <PostFeed>
            <Subheader>Adventure Board</Subheader>
            <SearchBar
                type="text"
                placeholder="Search posts..."
                onChange={e => {setSearchTerm(e.target.value)}}
              />
            {posts.filter((post) => {
              if (searchTerm === "") {
                return post
              } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                return post
              }
            }).map((post, index) => (
              <Post>
                <Link to={`/posts/${post.id}`} key={`${post.id}-${index}`}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                  <AuthorInfo>
                    <h4>By: {post.username}</h4>
                    <h6>Created at: {moment(post.created_at).format('h:mma MMM.DD.YY')}</h6>
                  </AuthorInfo>
                </Link>
              </Post>
            ))}
          </PostFeed>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
