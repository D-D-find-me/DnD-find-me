import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NewPostPage = styled.div`
    background-image: url('https://snappygoat.com/o/c39e38c0b6ed683cd5ca5e3000f7dfba9b992e1c/Designed-grunge-paper-texture-background.jpg');
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PostBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 55vw;
    height: 55vh;
    background-color: #4D4F53;
    padding: 20px;
    border-width: 6px;
    border-style: outset;
    border-color: #606060;
`
const Inputs = styled.input`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    width: 20vw;
    background-color: #fffeee;
    text-align: center;
`
const ContentBox = styled.textarea`
    font-size: 16px;
    background-color: #fffeee;
`
const NewPostHeader = styled.h1`
    display: flex;
    justify-content: center;
    font-family: 'Press Start 2P', cursive;
    -webkit-text-stroke: .6px #fffeee;
`
const Buttons = styled.div`
    box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
	border: 2px solid #333029;
	display: inline-block;
	cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 12px;
	font-weight: bold;
	padding: 8px 12px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
    margin: 10px;
`
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const NewPost = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [zipcode, setZipcode] = useState('');
    // const history = useHistory(); don't believe this is necessary while using props

    const addPost = async () => {
        try {
            await axios.post('/api/post', {title, content, zipcode});
            props.history.push('/home')
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <NewPostPage>
            <NewPostHeader>
                Post A Bulletin
            </NewPostHeader>
            <PostBox onSubmit={addPost}>
                <Inputs 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {/* changed this from input to a text area so that the text isn't an "input" */}
                <ContentBox
                    style={{width: '30vw', height: '28vh'}}
                    type="text"
                    placeholder="Start writing here"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Inputs
                    type="text"
                    placeholder="Your zipcode here"
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                />
            <ButtonBox>
                <Buttons>
                    <Link to="/home">Cancel</Link>
                </Buttons>
                <Buttons onClick={addPost}>
                    Post
                </Buttons>
            </ButtonBox>
            </PostBox>
        </NewPostPage>
    );
}

export default NewPost;