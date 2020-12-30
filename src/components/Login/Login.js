import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';
import styled from 'styled-components';

const LoginPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("bk_map_opac.jpg");
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
`
const PageHeader = styled.div`
    font-family: 'Press Start 2P', cursive;
    font-size: 28px;
    background: url("flame.gif") no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1.75px;
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
	font-size: 10px;
	font-weight: bold;
	padding: 12px 16px;
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
const LoginBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #4D4F53;
    padding: 20px;
    border-width: 6px;
    border-style: outset;
    border-color: #606060;
`
const Password = styled.div`
    padding: 10px;
    font-family: 'Ubuntu Mono', monospace;
    font-weight: bold;
    display: flex;
    justify-content: center;
    font-size: 18px;
`
const Username = styled.div`
    padding: 10px;
    font-family: 'Ubuntu Mono', monospace;
    font-weight: bold; 
    display: flex;
    justify-content: center;
    font-size: 18px;
`

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('/api/login', { username, password })
            props.loginUser(user.data)
            history.push('/home')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <LoginPage>
            <PageHeader>
                <h1>DnD FindMe</h1>
            </PageHeader>
            <LoginBox>
                <form onSubmit={e => login(e)}>
                    <div>
                        <Username>Username:  
                            <input
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Username>
                        <Password>Password:  
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Password>
                    </div>
                <ButtonBox>
                    <Buttons>
                        <Link to="/register" style={{textDecoration: "none", color: "black"}}>Need to Register?</Link>
                    </Buttons>
                    <Buttons onClick={e => login(e)}>Enter, Friend</Buttons>
                </ButtonBox>
                </form>
            </LoginBox> 
        </LoginPage>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser })(Login);