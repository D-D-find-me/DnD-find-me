import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-between;
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
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
    margin-right: 30px;
    max-width: 25%;
`
const HomeLink = styled.div`
    font-size: 32px;
    display: flex;
    flex: 1 1 33%;
    justify-content: center;
    align-items: center;
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
const Logout = styled.div`
    border: 2px solid #eddcd2;
    width: 80px;
    height: 18px; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
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
    const location = useLocation()

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
                <Logout>
                    <Link to='/' style={{color: '#eddcd2'}} onClick={props.logoutUser}>Logout</Link>
                </Logout>
            </NavRight>
        </WholeHeader>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Header);
