import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import styled, { createGlobalStyle } from "styled-components";
import classList from "../../classes.json";
import BulkExports from "twilio/lib/rest/preview/BulkExports";

const GlobalStyle = createGlobalStyle`
  body{
    background-image: url("wood.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
`;
const ProfileInfo = styled.div`
margin: 0 auto;
display: flex;
`
const Posts = styled.div`
  width: 80%;
  padding-top: 20px;
`
const Post = styled.div`
  width: 70%;
  padding:15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 15px;
  background-image: url("parchment2.jpg");
  :hover {
    filter: drop-shadow(0px 0px 5px white);
  }
`;

const PostContent = styled.div`
  width: 90%;
`;
const PostTitle = styled.h3`
  font-size: 15px;
  font-family: "Press Start 2P", cursive;
  color: black;
`;

const PostDescription = styled.span`
  margin-left: 15px;
  font-size: 18px;
  font-family: "Ubuntu Mono", monospace;
  color: black;
`;

const AuthorInfo = styled.div`
display: flex;
justify-content: space-between;
color: black;
`;

const ProfileHeader = styled.div`
  min-width: 296px;
  max-width: 296px;
  font-family: 'Ubuntu Mono', monospace;
  height: 90.9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImgContainer = styled.div`
  height: 200px;
  width: 200px;
`;
const ProfilePicture = styled.img`
  background-color: #ffd8b4;
  max-height: 200px;
  max-width: 200px;
  min-height: 200px;
  min-width: 200px;
  border-radius: 50%;
`;

const Username = styled.h1 `
  margin-top: 20px;
  font-size: 30px;
	font-family: 'Press Start 2P', cursive;
`
const Classname = styled.div `
margin-top: 10px;
font-size: 20px;
`
const Dm = styled.div `
margin-top: 10px;
font-size: 20px;
`
const Online = styled.div `
margin-top: 10px;
font-size: 20px;
`
const Contact = styled.div `
margin-top: 10px;
font-size: 20px;
`
const Zipcode = styled.div `
margin-top: 10px;
font-size: 20px;
`

const EditProfile = styled.div`
  color: white;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 20px;
  min-width: 296px;
  max-width: 296px;
  display: flex;
  left: 0;
  bottom: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 90.9vh;
`;
const EditContainer = styled.div`
  min-width: 296px;
  max-width: 296px;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const EditButton = styled.button`
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
    
`;

const ContentHeader = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Press Start 2P", cursive;
  font-size: 22px;
  color: white;
  /* Keep this for Combination Stroke/Shadow effect: */
  -webkit-text-stroke: 1px black;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
  flex-direction: column;
  width: 100%;
`;

const Submit = styled.button `
  box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color: #eae0c2;
	border-radius: 15px;
  border: 2px solid #333029;
  height: 50px;
  width:200px;
	display: inline-block;
	cursor: pointer;
	color: black;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	padding: 12px 16px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #ffffff;
  margin-top: 10px;
`


const Profile = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usersPosts, setUsersPosts] = useState([]);

  const [username, setUsername] = useState("");
  const [char_class, setCharClass] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone_num, setCellphone] = useState("");
  const [dm, setWouldDM] = useState("false");
  const [online, setGameType] = useState("false");
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    let profileNum = props.match.params.id;
    const getUsersPosts = async () => {
      try {
        const res = await axios.get(`/api/profileposts/${profileNum}`);
        setUsersPosts(res.data);
      } catch (err) {
        console.log("err on getposts func, frontend", err);
      }
    };
    const setProfileInfo = () => {
      axios.get(`/api/advprofile/${profileNum}`).then((res) => {
        const {
          username,
          char_class,
          zipcode,
          phone_num,
          dm,
          online,
          pfp,
        } = res.data[0];
        setUsername(username);
        setCharClass(char_class);
        setZipcode(zipcode);
        setCellphone(phone_num);
        setWouldDM(dm);
        setGameType(online);
        setPfp(pfp);
      });
    };
    setProfileInfo();
    getUsersPosts();
  }, []);

  const editUser = () => {
    axios
      .put("/api/adventurer", {
        username,
        char_class,
        zipcode,
        phone_num,
        dm,
        online,
        pfp,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const currentId = props.user.id
  const pageId = props.match.params.id

  return (
    <ProfileInfo>
      <GlobalStyle />
      <ProfileHeader>
        <div>
          <ImgContainer>
            <ProfilePicture src={pfp} />
          </ImgContainer>
    
          <div>
            <Username>{username}</Username>
            <Classname>Class: {char_class}</Classname>
            <Dm>{dm ? "Dungeon Master" : "Adventurer"}</Dm>
            <Online>{online ? "Plays Online" : "Plays Offline"}</Online>
            <Contact>
              Contact:{" "}
              {phone_num
                ? `${phone_num}`
                : "This user has not connected their phone number."}
            </Contact>
            <Zipcode>Zipcode: {zipcode}</Zipcode>
          </div>

        </div>
        
        {
          currentId == pageId ?
          <EditButton onClick={() => setIsEditing(!isEditing)}>
            Edit Profile
          </EditButton>
          : 
          null
        }
      </ProfileHeader>
      {isEditing ? (
          <EditProfile className="EditProfile">
            <EditContainer>
              <div style={{marginTop: "20px"}}>
                Change Username:
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>

              <div style={{marginTop: "20px"}}>
                Player Class:
                <select
                  name="player class"
                  type="text"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => {
                    setCharClass(classList[e.target.value].name);
                    setPfp(classList[e.target.value].pfp);
                  }}
                >
                  <option value="DEFAULT" disabled>
                    Click to choose...
                  </option>
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
              </div>

              <div style={{marginTop: "20px"}}>
                Change Zipcode to:
                <input
                  placeholder="Zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                ></input>
              </div>

              <div style={{marginTop: "20px"}}>
                Change Phone Number to:
                <input
                  placeholder="Phone Number"
                  value={phone_num}
                  onChange={(e) => setCellphone(e.target.value)}
                ></input>
              </div>

              <div style={{marginTop: "20px"}}>
                Would you like to DM?
                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <div style={{width: "100px"}}>
                    <input type="radio" id="dm-true" name="dm" value="true"
                      onChange={(e) => setWouldDM(e.target.value)}
                    />
                    <div htmlFor="dm-true">Yes</div>
                    </div>
                    <div style={{width: "100px"}}>
                    <input
                      type="radio"
                      id="dm-false"
                      name="dm"
                      value="false"
                      onChange={(e) => setWouldDM(e.target.value)}
                    />
                    <div htmlFor="dm-false">No</div>
                  </div>
                </div>
              </div>

              <div style={{marginTop: "20px"}}>
                Do you prefer online or in-person games?
                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <div>
                    <input
                      type="radio"
                      id="online-true"
                      name="online"
                      value="true"
                      onChange={(e) => setGameType(e.target.value)}
                    />
                    <div htmlFor="online-true">Online</div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="online-false"
                      name="online"
                      value="false"
                      onChange={(e) => setGameType(e.target.value)}
                    />
                    <div htmlFor="online-false">In-person</div>
                  </div>
                </div>
              </div>

              <Submit
                onClick={() => {
                  editUser();
                  setIsEditing(false);
                }}
              >
                Submit Changes
              </Submit>
            </EditContainer>
          </EditProfile>
        ) : null}
      <Posts>
        <ContentHeader>{username}'s Adventures</ContentHeader>
        <div>
          {usersPosts.map((post, index) => (
            <Post>
              <Link
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                to={`/posts/${post.id}`}
                key={`${post.id}-${index}`}
              >
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDescription>{post.content}</PostDescription>
                  <AuthorInfo>
                    <h4 style={{fontWeight: 'bold'}}>By: {post.username}</h4>
                    <h6>
                      Created at:{" "}
                      {moment(post.created_at).format("h:mma MMM.DD.YY")}
                    </h6>
                  </AuthorInfo>
                </PostContent>
              </Link>
            </Post>
          ))}
        </div>
      </Posts>
    </ProfileInfo>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);
