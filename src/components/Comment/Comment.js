import {useState} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

    const CommentContainer = styled.div `
        display: flex;
        margin: 10px;
        border: 1px solid black;
    `
    const SecondContainer = styled.div `
    min-height: 150px;
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
    font-family: 'Ubuntu Mono', monospace;
    font-size: 15px;
    height: 15px;
    font-weight: 900;
    margin: 17.5px 0px 17.5px 10px;
    `
    const CommentText = styled.p `
    width: 75%;
    margin: auto;
    margin-left: 50px;
    text-align: left;
    `
    const TimestampSection = styled.h6 `
    color: black;
    `
    const TimestampBox = styled.div`
    display: flex;
    justify-content: flex-end;
    min-width: 20vw;
    `
    const DeleteButton = styled.button`
    background-color: rgb(250, 242, 192);
    width: 25px;
    height: 25px;
    font-size: 13px;
    font-family: 'Press Start 2P', cursive;
    margin: 5px;
    `
    const DeleteDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 15vw;
    `
    const EditButtons = styled.button`
    font-family: 'Press Start 2', cursive;
    font-size: 13px;
    background-color: rgb(250, 242, 192);
    margin: 4px;
    max-width: 100px; 
    `
    const EditDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
                    <Username>{props.username}</Username>
                    <TimestampBox>
                    <TimestampSection>{moment(props.created_at).format('h:mma MMM.DD.YY')}</TimestampSection>
                    </TimestampBox>
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