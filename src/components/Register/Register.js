import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";
import styled from 'styled-components';

const RegisterBackground = styled.div`
  background-image: url("registerbkd1.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const PageTitles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  padding: 30px;
  color: #A5A6A1;
  -webkit-text-stroke: 0.75px black;
`
const Title = styled.h1`
  font-size: 28px;
`
const Subtitle = styled.h1`
  font-size: 20px;
`
const AllInputFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.38);
`
const InputField = styled.div`
  padding: 10px;
  font-family: 'Ubuntu Mono', monospace;
  font-weight: bold; 
  width: 300px;
  display: flex;
  justify-content: space-between;
  color: #A5A6A1;
`
const Button = styled.button`
  box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #616247 5%, #616247 100%);
	background-color: #616247;
	border-radius: 15px;
	border: 2px solid #333029;
	display: inline-block;
	cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	padding: 12px 16px;
	text-decoration: none;
  margin: 10px;
`

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [char_class, setCharClass] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone_num, setCellphone] = useState("");
  const [dm, setWouldDM] = useState("false");
  const [online, setGameType] = useState("false");
  const [pfp, setPfp] = useState("img.jpeg"); ////THIS IS DUMMY DATA FOR PROFILE PICTURE WE WILL CHANGE THIS
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/register", {
        username,
        password,
        char_class,
        zipcode,
        phone_num,
        dm,
        online,
        pfp
      });
      // May need to fix this next line:
      props.loginUser(user.data);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RegisterBackground>
      <PageTitles>
        <Title>Find Your Next Adventure</Title>
        <Subtitle>Register for an Account</Subtitle>
      </PageTitles>
      <AllInputFields>
        <div>
          <div>
            <InputField>
              Username:
              <input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputField>
            <InputField>
              Password:
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>
            <InputField>
              Player Class:
              <input
                name="player class"
                type="text"
                value={char_class}
                onChange={(e) => setCharClass(e.target.value)}
              />
            </InputField>
            <InputField>
              Zipcode:
              <input
                name="zipcode"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </InputField>
            <InputField>
              Cellphone #:
              <input
                name="cellphone number"
                type="text"
                value={phone_num}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </InputField>
            <InputField>
              Would you like to DM?
              <input
                type="radio"
                id="dm-true"
                name="dm"
                value="true"
                onChange={(e) => setWouldDM(e.target.value)}
              />
              <label htmlFor="dm-true">Yes</label>
              <input
                type="radio"
                id="dm-false"
                name="dm"
                value="false"
                onChange={(e) => setWouldDM(e.target.value)}
              />
              <label htmlFor="dm-false">No</label>
            </InputField>
            <InputField>
              Do you prefer online or in-person games?
              <input
                type="radio"
                id="online-true"
                name="online"
                value="true"
                onChange={(e) => setGameType(e.target.value)}
              />
              <label htmlFor="online-true">Online</label>
              <input
                type="radio"
                id="online-false"
                name="online"
                value="false"
                onChange={(e) => setGameType(e.target.value)}
              />
              <label htmlFor="online-false">In-person</label>
            </InputField>
          </div>
        </div>
        <div>
          <Button>
            <Link style={{textDecoration:"none", color:"black"}}to="/">Already Registered?</Link>
          </Button>
          <Button onClick={(e) => register(e)}>Register</Button>
        </div>
      </AllInputFields>
    </RegisterBackground>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Register);
