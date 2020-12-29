import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Comment = (props) => {

    return (
        <div>
            <div>
                <img src={props.user.pfp}/>
            </div>
            <div>
                <h2>{props.user.username}</h2>
                <p>{props.body}</p>
            </div>
            <div>
                {props.created_at}
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);