import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("lake1_navbar.jpg");
    background-repeat: no-repeat;
    background-position: bottom;
    position: relative;
    width: 100vw;
    height: 85px;
    padding: 0px 0px 10px 0px;
    z-index: 3;
`
const NavLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 25vw;
    font-size: 11px;
    color: whitesmoke;
    font-family: 'Press Start 2P', cursive;
`
const NavRight = styled.div`
    display: flex;
    justify-content: space-around;
    width: 25vw;
    font-size: 11px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;
`
const HomeLink = styled.div`
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Press Start 2P', cursive;
    text-shadow: 0 3px 0 rgba(255, 255, 255, 0.4);
`
const Greeting = styled.p`
    color: #eddcd2;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
`
const ProfilePic = styled.div`
    max-height: 70px;
`
const Image = styled.img`
    height: 70px;
    border-radius: 50%;
    padding: 10px;
`
const Logout = styled.div`

`

const Header = (props) => {
    const location = useLocation()
    if(location.pathname === '/' || location.pathname === '/register'){
        return null
    }else{
        return(
        <WholeHeader>
            <NavLeft>
            <Logout>
                    <Link to='/' style={{border: '2px solid black', 
                    backgroundColor: '#fffeee', 
                    width: '80px',
                    height: '18px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}} onClick={props.logoutUser}>Logout</Link>
                </Logout>
                <ProfilePic>
                    {props.user.pfp === 'img.jpeg' ?
                    null :
                    <Image alt="profile pic" src={props.user.pfp}/>}
                </ProfilePic>
                <Greeting>Greetings, {props.user.char_class} {props.user.username}.</Greeting>
            </NavLeft>
            <HomeLink>
                <Link to='/home' style={{color:"black"}}>DnD FindMe</Link>
            </HomeLink>
            <NavRight>
                <Link to='/findadventure' style={{color:"#eddcd2"}}>Find Adventures Near Me</Link>
                <Link to='/newpost' style={{color:"#eddcd2"}}>Post a Bulletin</Link>
            </NavRight>
        </WholeHeader>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Header);
