import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";

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
                value={char_class}
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
                value={phone_num}
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
              <label htmlFor="dm-true">Yes</label>
              <input
                type="radio"
                id="dm-false"
                name="dm"
                value="false"
                onChange={(e) => setWouldDM(e.target.value)}
              />
              <label htmlFor="dm-false">No</label>
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
              <label htmlFor="online-true">Online</label>
              <input
                type="radio"
                id="online-false"
                name="online"
                value="false"
                onChange={(e) => setGameType(e.target.value)}
              />
              <label htmlFor="online-false">In-person</label>
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
