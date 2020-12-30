import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';

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
    <div className="Home">
      <div className="home-header">
        <h1>Adventure Board</h1>
      </div>
      <div className="posts">
        {posts.length < 1 ? (
          <img
            src="https://media0.giphy.com/media/eIZZQ7npNjfsqizTwO/200w.webp?cid=ecf05e47bu1ve49khspqx0bmsciosj5c47omlleqbtgjatas&rid=200w.webp"
            alt="loading gif"
          />
        ) : (
          <ul style={{ listStyle: "none" }}>
            {posts.map((post, index) => (
              <Link to={`/posts/${post.id}`} key={`${post.id}-${index}`}>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
                <div>
                    {/* {console.log(format(new Date(post.created_at), 'yyyy/MM/dd kk:mm:ss'))} */}
                  <h5>By: {post.username}</h5>
                  <h6>Created at: {moment(post.created_at).format('h:mm a MMM/DD/YY')}</h6>
                </div>
                <br/>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
