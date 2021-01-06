import { connect } from 'react-redux';
import {useEffect} from 'react';
import { logoutUser, getUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("lake1_navbar.jpg");
    background-repeat: repeat;
    background-position: bottom;
    position: sticky;
    top: 0;
    height: 85px;
    padding: 0px 0px 10px 0px;
    z-index: 3;
    width: 100%;
`
const NavLeft = styled.div`
    display: flex;
    flex: 1 1 33%;
    align-items: center;
    font-size: 11px;
    color: whitesmoke;
    font-family: 'Press Start 2P', cursive;
    max-width: 25%;
`
const NavRight = styled.div`
    display: flex;
    flex: 1 1 33%;
    justify-content: space-evenly;
    align-items: center;
    font-size: 11px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
    margin-right: 25px;
    max-width: 25%;
`
const HomeLink = styled.div`
    font-size: 32px;
    display: flex;
    flex: 1 1 33%;
    justify-content: center;
    align-items: center;
    align-self:center;
    font-family: 'Press Start 2P', cursive;
    text-shadow: 0 3px 0 rgba(255, 255, 255, 0.4);
    max-width: 50%;
`
const Greeting = styled.p`
    color: #eddcd2;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
`
const ProfilePic = styled.div`
    max-height: 60px;
    max-width: 40px;
    border: 10px solid;
    border-image: url("castlewall3.png") 10% round;
    margin: 30px 15px 20px 30px;
`
const Image = styled.img`
    height: 50px;
`
const Logout = styled.button`
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
    align-self: flex-end;
	font-family: 'Press Start 2P', cursive;
	font-size: 10px;
	font-weight: bold;
	padding: 12px 16px;
	text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
    margin-bottom: 8px;
`
const FindAdventure = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
`
const PostABulletin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 40px;
`

const Header = (props) => {
    const location = useLocation();

    useEffect(() => {
        props.getUser();
    }, [getUser])

    if(location.pathname === '/' || location.pathname === '/register') {
        return null
    } else {
        return(
        <WholeHeader>
            <Link to={`/profile/${props.user.id}`}>
                <NavLeft>
                        <ProfilePic>
                            {props.user.pfp === 'img.jpeg' ?
                            null :
                            <Image alt="profile pic" src={props.user.pfp}/>}
                        </ProfilePic>
                        <Greeting>Greetings, {props.user.char_class} {props.user.username}.</Greeting>
                </NavLeft>
            </Link>
            <HomeLink>
                <Link to='/home' style={{color:"black"}}>DnD FindMe</Link>
            </HomeLink>
            <NavRight>
                <FindAdventure>
                    <Link to='/findadventure' style={{color:"#eddcd2"}}>Find Adventures<br></br>Near Me</Link>
                </FindAdventure>
                <PostABulletin>
                    <Link to='/newpost' style={{color:"#eddcd2"}}>Post a <br></br>Bulletin</Link>
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
