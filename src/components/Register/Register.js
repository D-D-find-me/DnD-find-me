import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [charClass, setCharClass] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [wouldDM, setWouldDM] = useState("false");
  const [gameType, setGameType] = useState("false");
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/register", {
        username,
        password,
        charClass,
        zipcode,
        cellphone,
        wouldDM,
        gameType,
      });
      // May need to fix this next line:
      props.loginUser(user.data);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Find Your Next Adventure</h1>
        <h2>Register for an Account</h2>
      </div>
      <div>
        <div>
          <div>
            <div>
              Username:
              <input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              Player Class:
              <input
                name="player class"
                type="text"
                value={charClass}
                onChange={(e) => setCharClass(e.target.value)}
              />
            </div>
            <div>
              Zipcode:
              <input
                name="zipcode"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
            <div>
              Cellphone #:
              <input
                name="cellphone number"
                type="text"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </div>
            <div>
              Would you like to DM?
              <input
                type="radio"
                id="dm-true"
                name="dm"
                value="true"
                onChange={(e) => setWouldDM(e.target.value)}
              />
              <label htmlFor="dm-true">True</label>
              <input
                type="radio"
                id="dm-false"
                name="dm"
                value="false"
                onChange={(e) => setWouldDM(e.target.value)}
              />
              <label htmlFor="dm-false">False</label>
            </div>
            <div>
              Do you prefer online or in-person games?
              <input
                type="radio"
                id="online-true"
                name="online"
                value="true"
                onChange={(e) => setGameType(e.target.value)}
              />
              <label htmlFor="online-true">True</label>
              <input
                type="radio"
                id="online-false"
                name="online"
                value="false"
                onChange={(e) => setGameType(e.target.value)}
              />
              <label htmlFor="online-false">False</label>
            </div>
          </div>
        </div>
        <div>
          <button onClick={(e) => register(e)}>Register</button>
          <button>
            <Link style={{textDecoration:"none", color:"black"}}to="/">Already Registered?</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Register);
