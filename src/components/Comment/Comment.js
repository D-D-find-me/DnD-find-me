import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Comment = (props) => {
    return (
        <div>
            <div>
                {props.pfp === 'img.jpeg' ?
                null :
                <img src={props.pfp} alt='profile'/>}
            </div>
            <div>
                <h2>{props.username}</h2>
                <p>{props.body}</p>
            </div>
            <div>
                <h6>{moment(props.created_at).format('h:mma MMM.DD.YY')}</h6>
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);