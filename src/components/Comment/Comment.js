import {useState} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

    const CommentContainer = styled.div `
        display: flex;
        margin: 10px;
        border: 1px solid black;
        font-family: 'Ubuntu Mono', monospace;
    `
    const SecondContainer = styled.div `
    min-height: 150px;
    min-width: 90%;
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
    margin: 5px;
    `
    const Username = styled.h6 `
    font-size: 18px;
    height: 15px;
    font-weight: 900;
    margin: 17.5px 0px 7px 10px;
    `
    const CommentText = styled.p `
    width: 90%;
    margin-left: 50px;
    text-align: left;
    `
    const TimestampSection = styled.h6 `
    color: black;
    font-size: 11px;
    font-weight: bold;
    `
    const UsernameTimestamp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    `
    const DeleteButton = styled.button`
    box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
  border: 2px solid #333029;
  height: 35px;
  width: auto;
	display: inline-block;
	cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
    `
    const DeleteDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 5vw;
    `
    const EditButtons = styled.button`
    box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
  border: 2px solid #333029;
  height: auto;
  width: auto;
	display: inline-block;
    cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	padding: 12px 16px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
    margin: 10px; 
    `
    const EditDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 90%;
    `

const Comment = (props) => {

    const [edit, setEdit] = useState(false)
    const [commentBody, setCommentBody] = useState(props.body)

    const onClickFunc = () => {
        props.editComment(props.id, commentBody);
        setEdit(false);
    }

    return (
        <CommentContainer>
            <SecondContainer>
                <ProfileInfo>
                    {props.pfp === 'img.jpeg' ?
                    null :
                    <ProfilePicture src={props.pfp} alt='profile'/>}
                    <UsernameTimestamp>
                        <Username>{props.username}</Username>
                        <TimestampSection>{moment(props.created_at).format('h:mma MMM.DD.YY')}</TimestampSection>
                    </UsernameTimestamp>
                </ProfileInfo>
                <CommentText>{props.body}</CommentText>
                <div>
                    {edit ? 
                    <div>
                        <div>
                            <textarea type='text' style={{minWidth: '199px', minHeight: '70px'}} value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                        </div>
                        <EditDiv>
                            <EditButtons onClick={() => setEdit(false)}>Cancel</EditButtons>
                            <EditButtons onClick={() => onClickFunc()}>Update</EditButtons>
                        </EditDiv>
                    </div>
                    : null}
                    {props.user.id === props.commentor_id ?
                    <EditDiv>
                        <EditButtons onClick={() => setEdit(true)}>Edit Comment</EditButtons>
                    </EditDiv>
                    : null}
                </div>
            </SecondContainer>
            <DeleteDiv>
                {props.user.id === props.commentor_id ?
                <DeleteButton onClick={() => props.deleteComment(props.id)}>x</DeleteButton>
                : null}
            </DeleteDiv>
        </CommentContainer>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);