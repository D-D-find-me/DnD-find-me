import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import styled, { createGlobalStyle } from "styled-components";
import classList from "../../classes.json";

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
const Post = styled.div`
  width: 50%;
  padding:15px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #DFDFDF; */
  margin: auto;
  margin-top: 15px;
  background-image: url("parchment2.jpg");
  :hover {
    //changed the hover element to have a border and shadow - not attached to it tho <3
    border: 3px solid darkgray;
    box-shadow: 2px 2px 2px lightgray;
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

const LoadingGif = styled.img`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0px;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24%;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImgContainer = styled.div`
  height: 200px;
  width: 200px;
`;
const ProfilePicture = styled.img`
  background-color: #ffd8b4;
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;
const EditProfile = styled.div`
  display: flex;
  left: 0;
  bottom: 15px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 30%;
  justify-content: center;
  flex-direction: row;
`;
const EditContainer = styled.div`
  justify-content: center;
  align-items: center;

  background-color: rba(0, 0, 0, 0.76);
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
const SaveButton = styled.button`
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
`
const CancelButton = styled.button`
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
`
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
const Posts = styled.div`

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
        console.log(username, char_class, zipcode, phone_num, dm, online, pfp);
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

  return (
    <ProfileInfo>
      <GlobalStyle />
      <ProfileHeader>
        {isEditing ? (
          <EditProfile>
            <EditContainer>
              <div>
                Change Username:
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>

              <div>
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

              <div>
                Change Zipcode to:
                <input
                  placeholder="Zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                ></input>
              </div>

              <div>
                Change Phone Number to:
                <input
                  placeholder="Phone Number"
                  value={phone_num}
                  onChange={(e) => setCellphone(e.target.value)}
                ></input>
              </div>

              <div>
                Would you like to DM?
                <div>
                  <input
                    type="radio"
                    id="dm-true"
                    name="dm"
                    value="true"
                    onChange={(e) => setWouldDM(e.target.value)}
                  />
                  <div htmlFor="dm-true">Yes</div>
                </div>
                <div>
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
              <div>
                Do you prefer online or in-person games?
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
              <SaveButton
                onClick={() => {
                  editUser();
                  setIsEditing(false);
                }}
              >
                Submit Changes
              </SaveButton>
              <CancelButton onClick={() => setIsEditing(false)}>Cancel</CancelButton>
            </EditContainer>
          </EditProfile>
        ) : null}
        <ImgContainer>
          <ProfilePicture src={pfp} />
        </ImgContainer>

        <div>
          <h1>{username}</h1>
          <div>Class: {char_class}</div>
          <div>{dm ? "Dungeon Master" : ""}</div>
          <div>{online ? "Plays Online" : "Plays Offline"}</div>
          <div>
            Contact:{" "}
            {phone_num
              ? `${phone_num}`
              : "This user has not connected their phone number."}
          </div>
          <div>Zipcode: {zipcode}</div>
        </div>

        {
          //if user is on thier own profile page and not on someone elses

          <EditButton onClick={() => setIsEditing(!isEditing)}>
            Edit Profile
          </EditButton>
        }
      </ProfileHeader>

      <Posts>
        <ContentHeader>This Users Adventures</ContentHeader>

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
                    <h4>By: {post.username}</h4>
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
