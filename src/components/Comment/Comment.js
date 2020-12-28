import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Comment = (props) => {
const [body, updatebody] = useState('');
const [timestamp, updateTimestamp] = useState('');


    return (
        <div>
            <div>
                <img src={props.user.pfp}/>
            </div>
            <div>
                <h2>{props.user.username}</h2>
                <p>{props.user.id}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);