import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-image: url("wood.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
    }
`
const PostBox = styled.form`
    display: block;
    margin: 0 auto;
    height: 600px;
    background-image: url("inkwell_blue.png"), url("parchroll.png");
    background-size: 350px, 950px;
    background-repeat: no-repeat;
    background-position: left 1150px bottom -20px, center;
    padding-top: 110px;
    z-index: 1;
`
const Inputs = styled.input`
    display: block;
    margin: 0 auto;
    margin-top: 8px;
    font-size: 20px;
    width: 610px;
    text-align: left;
    font-size: 16px;
    font-family: 'Ubuntu Mono', monospace;
    padding: 2px 2px 2px 16px;
    background-color: rgba(250, 250, 250, 0.5);
    border: rgba(0, 0, 0, 0.5);
`
const ContentBox = styled.textarea`
    display: block;
    margin: 0 auto;
    padding: 16px;
    font-size: 16px;
    height: 50%;
    width: 610px;
    margin-top: 8px;
    background-color: rgba(250, 250, 250, 0.5);
    border: rgba(0, 0, 0, 0.5);
    border-radius: 10%;
`
const NewPostHeader = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Press Start 2P', cursive;
    font-size: 22px;
    color: white;
/* Keep this for Combination Stroke/Shadow effect: */
    -webkit-text-stroke: 1px black;
    text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
    width: 100%;
    padding-bottom: 8px;
    padding-top: 20px;
`
const Buttons = styled.button`
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
        <div>
            <GlobalStyle/>
            <NewPostHeader>
                Post A Bulletin
                {/* <Decoration src="inkwell_blue.png"/> */}
            </NewPostHeader>            
            <PostBox onSubmit={addPost}>
                <Inputs 
                    type="text"
                    placeholder="Title thine bulletin..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <ContentBox
                    type="text"
                    placeholder="Start writing here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Inputs
                    type="text"
                    placeholder="Enter thine Zipcode..."
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
        </div>
    );
}

export default NewPost;