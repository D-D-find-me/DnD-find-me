import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Home = () => {
const [posts, updatePosts] = useState([]);


    return (
        <div>
            Posts will appear here
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);