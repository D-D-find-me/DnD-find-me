import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import axios from 'axios';

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
    margin: 17.5px 0px 17.5px 10px;
    /* margin-top: 17.5px;
    margin-bottom: 17.5px; */
    `
    const CommentText = styled.p `
    width: 75%;
    margin: auto;
    margin-left: 50px;
    text-align: left;
    `
    const TimestampSection = styled.h6 `
    /* margin: 17.5px 0px 17.5px 80px; */
    /* margin-left: 80px; */
    color: black;
    /* margin-top: 17.5px; */
    /* margin-bottom: 17.5px; */
    `
    const TimestampBox = styled.div`
    display: flex;
    justify-content: flex-end;
    min-width: 20vw;
    `
    const DeleteButton = styled.button`
    /* border: none; */
    background-color: rgb(250, 242, 192);
    width: 25px;
    height: 25px;
    font-size: 13px;
    font-family: 'Press Start 2P', cursive;
    `
    const DeleteDiv = styled.div`
        display: flex;
        justify-content: flex-end;
        width: 15vw;
    `

const Comment = (props) => {


    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`)
            props.getComments()
        } catch(err){
            console.log('err on deletecomment func, front end', err)
        }
    }

    return (
        <CommentContainer>
            <SecondContainer>
                <ProfileInfo>
                    {props.pfp === 'img.jpeg' ?
                    null :
                    <ProfilePicture src={props.pfp} alt='profile'/>}
                    <Username>{props.username}</Username>
                    <TimestampBox>
                    <TimestampSection>{moment(props.created_at).format('h:mma MMM.DD.YY')}</TimestampSection>
                    </TimestampBox>
                </ProfileInfo>
                <CommentText>{props.body}</CommentText>
            </SecondContainer>
            <DeleteDiv>
                {props.user.id === props.commentor_id ?
                <DeleteButton onClick={() => deleteComment(props.id)}>x</DeleteButton>
                : null}
            </DeleteDiv>
        </CommentContainer>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);