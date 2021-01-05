import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NewPostBackground = styled.div`
background-image: url("wood.jpg");
background-repeat: no-repeat;
background-attachment: fixed;
background-size: 100% 100%;
min-width: 100%;
height: 90vh;
`
const NewPostPage = styled.div`
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
    background-image: url("parchment.jpg");
    background-size: cover;
    /* padding: 20px; */
    border-width: 6px;
    border-style: outset;
    border-color: #606060;
`
const Inputs = styled.input`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    width: 20vw;
    background-color: lightgray;
    text-align: center;
`
const ContentBox = styled.textarea`
    font-size: 16px;
    background-color: lightgray;
`
const NewPostHeader = styled.h1`
    display: flex;
    justify-content: center;
    font-family: 'Press Start 2P', cursive;
    -webkit-text-stroke: 1px black;
    color: white;
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

    const addPost = async () => {
        try {
            await axios.post('/api/post', {title, content, zipcode});
            props.history.push('/home')
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <NewPostBackground>
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
                        <Link to="/home" style={{color: 'black'}}>Cancel</Link>
                    </Buttons>
                    <Buttons onClick={addPost}>
                        Post
                    </Buttons>
                </ButtonBox>
                </PostBox>
            </NewPostPage>
        </NewPostBackground>
    );
}

export default NewPost;