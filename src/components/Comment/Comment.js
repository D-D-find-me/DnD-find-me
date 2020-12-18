import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Comment = (props) => {
const [body, updatebody] = useState('');
const [timestamp, updateTimestamp] = useState('');


    return (
        <div>
            Here find ye a comment!
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);