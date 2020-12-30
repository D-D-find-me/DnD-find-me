import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

const Comment = (props) => {

    const CommentContainer = styled.div `
        display: flex;
        margin: 10px;
    `
    const SecondContainer = styled.div `
    min-height: 150px 
    `
    const ProfileInfo = styled.div `
    width: 100%;
    min-height: 50px;
    display: flex;
    `
    const ProfilePicture = styled.img `
    min-height: 50px;
    min-width: 50px;
    max-height: 50px;
    max-width: 50px;
    background-color: white;
    border-radius: 50%;
    `
    const Username = styled.h6 `
    font-family: 'Ubuntu Mono', monospace;
    font-size: 15px;
    height: 15px;
    font-weight: 900;
    margin: 0;
    margin-top: 17.5px;
    margin-bottom: 17.5px;
    `
    const CommentText = styled.p `
    width: 75%;
    margin: auto;
    margin-left: 50px;
    text-align: left;
    `
    const TimestampSection = styled.h6 `
    margin: 0;
    margin-left: 10px;
    color: grey;
    margin-top: 17.5px;
    margin-bottom: 17.5px;
    `

    return (
        <CommentContainer>
            <SecondContainer>
                <ProfileInfo>
                    {props.pfp === 'img.jpeg' ?
                    null :
                    <ProfilePicture src={props.pfp} alt='profile'/>}
                    <Username>{props.username}</Username>
                    <TimestampSection>{moment(props.created_at).format('h:mm a MMM/DD/YY')}</TimestampSection>
                </ProfileInfo>
                <CommentText>{props.body}</CommentText>
            </SecondContainer>

        </CommentContainer>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);