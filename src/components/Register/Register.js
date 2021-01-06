import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";
import styled from 'styled-components';
import classList from '../../classes.json'

const RegisterBackground = styled.div`
  background-image: url("registerbkd1.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
  background-color: rgba(0, 0, 0, 0.50);
  width: 425px;
`
const InputField = styled.div`
  padding: 10px;
  font-family: 'Ubuntu Mono', monospace;
  font-weight: bold; 
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #A5A6A1;
`
const TFField = styled.div`
  padding: 10px;
  font-family: 'Ubuntu Mono', monospace;
  font-weight: bold; 
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #A5A6A1;
`
const RadioInput = styled.div`
  padding: 10px;
  font-family: 'Ubuntu Mono', monospace;
  font-weight: bold; 
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
const RadioButton = styled.label`
  margin: 5px;
`
const DropDown = styled.select`
  width: 75px;
`

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [char_class, setCharClass] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone_num, setCellphone] = useState("");
  const [dm, setWouldDM] = useState("false");
  const [online, setGameType] = useState("false");
  const [pfp, setPfp] = useState("");
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
      alert('Username or Phone Number Already Taken. Please Try Again.')
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
              <select 
                name="player class"
                type="text"
                defaultValue={'DEFAULT'}
                onChange={(e) => {
                  setCharClass(classList[e.target.value].name)
                  setPfp(classList[e.target.value].pfp)
                  }}>
                <option value='DEFAULT' disabled>Click to choose...</option>
                <option value={0}>Barbarian</option>
                <option value={1}>Bard</option>
                <option value={2}>Cleric</option>
                <option value={3}>Druid</option>
                <option value={4}>Fighter</option>
                <option value={5}>Monk</option>
                <option value={6}>Paladin</option>
                <option value={7}>Ranger</option>
                <option value={8}>Rogue</option>
                <option value={9}>Sorcerer</option>
                <option value={10}>Warlock</option>
                <option value={11}>Wizard</option>
              </select>
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
                type="tel"
                value={phone_num}
                placeholder='Enter +1 then phone #'
                onChange={(e) => setCellphone(e.target.value)}
              />
            </InputField>

            <TFField>
              Would you like to DM?
              <RadioInput>
                <input
                  type="radio"
                  id="dm-true"
                  name="dm"
                  value="true"
                  onChange={(e) => setWouldDM(e.target.value)}
                />
                <RadioButton htmlFor="dm-true">Yes</RadioButton>
              </RadioInput>
              <RadioInput>
                <input
                  type="radio"
                  id="dm-false"
                  name="dm"
                  value="false"
                  onChange={(e) => setWouldDM(e.target.value)}
                />
                <RadioButton htmlFor="dm-false">No</RadioButton>
              </RadioInput>
            </TFField> 

            <TFField> 
              Do you prefer online or in-person games?
              <RadioInput>
                <input
                  type="radio"
                  id="online-true"
                  name="online"
                  value="true"
                  onChange={(e) => setGameType(e.target.value)}
                />
                <RadioButton htmlFor="online-true">Online</RadioButton>
              </RadioInput>
              <RadioInput>
                <input
                  type="radio"
                  id="online-false"
                  name="online"
                  value="false"
                  onChange={(e) => setGameType(e.target.value)}
                />
                <RadioButton htmlFor="online-false">In-person</RadioButton>
              </RadioInput>
            </TFField>
          </div>
        </div>
        <div>
            <Link style={{textDecoration:"none", color:"black"}}to="/">
              <Button>
                Already Registered?
              </Button>
            </Link>
          <Button onClick={(e) => register(e)}>Register</Button>
        </div>
      </AllInputFields>
    </RegisterBackground>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Register);
