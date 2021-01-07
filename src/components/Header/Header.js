import { connect } from 'react-redux';
import {useEffect} from 'react';
import { logoutUser, getUser } from '../../redux/reducer';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 33%;
    background-image: url("stonewall_header2.jpg");
    background-position: bottom 0;
    background-size: cover;
    position: sticky;
    -webkit-box-shadow: 3px 3px 5px 6px #000000;
    -moz-box-shadow: 3px 3px 5px 6px #000000;
    box-shadow: 3px 3px 5px 6px #000000;  
    top: 0;
    height: 85px;
    padding: 0px 0px 10px 0px;
    width: 100%;
`
const NavLeft = styled.div`
    display: flex;
    align-items: center;
    font-size: 11px;
    color: whitesmoke;
    font-family: 'Press Start 2P', cursive;
    max-width: 33%;
    z-index: 3;
    margin-left: 10px;
    :hover{
        cursor: pointer;
    }
`
const NavRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
    margin-right: 25px;
    max-width: 500px;
    line-height: 125%;
    margin-top: 15px;
    z-index: 3;
`
const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`
const HomeLink = styled.div`
    font-family: 'Press Start 2P', cursive;
    font-size: 34px;
    background: url("flame.gif") no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1.75px;
    padding-top: 24px;
    top: 0;
    text-align: center;
    margin-bottom: 20px;
`
const Greeting = styled.p`
    color: #eddcd2;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    text-align: center;
    padding-top: 12px;
    line-height: 125%;
    max-width: 500px;
`
const ProfilePicContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 12px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
`
const ProfilePic = styled.img`
    height: 60px;
    border-radius: 50%;
    -webkit-box-shadow: 3px 3px 3px 4px #000000;
    -moz-box-shadow: 3px 3px 3px 4px #000000;
    box-shadow: 3px 3px 3px 4px #000000;
    margin-right: 10px;
`    
const LogoPic = styled.img`
    height: 66px;
    margin: 10px 15px 15px 10px;
`
const Logout = styled.button`
    box-shadow: 0px 1px 0px 0px #1c1b18;
	background: linear-gradient(to bottom, #8B8D6A 5%, #616247 100%);
	background-color: #616247;
	border-radius: 15px;
    border: 2px solid #333029;
    height: 25px;
    width: auto;
	display: inline-block;
    cursor: pointer;
    color: black;
    align-self: flex-end;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	text-decoration: none;
`
const FindAdventure = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
`
const PostABulletin = styled.div`
    text-align: center;
    padding-right: 40px;
`
const Header = (props) => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        props.getUser();
    }, [getUser])

    if(location.pathname === '/' || location.pathname === '/register') {
        return null
    } else {
        return(
        <WholeHeader>
            <NavLeft onClick={() => history.push(`/profile/${props.user.id}`)}>
                    <ProfilePicContainer>
                        {props.user.pfp === 'img.jpeg' ?
                        null :
                        <ProfilePic alt="profile pic" src={props.user.pfp}/>}
                    </ProfilePicContainer>
                    <Greeting>Greetings, {props.user.char_class} {props.user.username}!</Greeting>
            </NavLeft>
            <HomeContainer>
                <LogoPic alt="dragon avatar facing right" src={"8bitdragon_blue.png"}/>
                <HomeLink>
                    <Link to='/home' style={{color:"black"}}>DnD FindMe</Link>
                </HomeLink>
                <LogoPic alt="dragon avatar facing left" src={"8bitdragon_bluer.png"}/>
            </HomeContainer>
            <NavRight>
                <FindAdventure>
                    <Link to='/findadventure' style={{color:"#eddcd2"}}>Find<br/>Adventures</Link>
                </FindAdventure>
                <PostABulletin>
                    <Link to='/newpost' style={{color:"#eddcd2"}}>Post<br/>Bulletin</Link>
                </PostABulletin>
                <Link to='/' style={{color: 'black'}} onClick={props.logoutUser}>
                    <Logout>
                        Logout
                    </Logout>
                </Link>
            </NavRight>
        </WholeHeader>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser, getUser })(Header);
