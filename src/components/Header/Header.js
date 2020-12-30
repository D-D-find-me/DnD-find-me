import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("trees_navbar1.jpg");
    background-position: bottom 40px;
    position: absolute;
    width: 100vw;
    height: 125px;
    font-family: 'Press Start 2P', cursive;
`
const NavLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 25vw;
    font-size: 12px;
    font-weight: 400;
`
const NavRight = styled.div`
    display: flex;
    justify-content: space-around;
    width: 25vw;
    font-size: 12px;
    text-align: center;
    
`
const HomeLink = styled.div`
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = (props) => {
    const location = useLocation()
    console.log(props)
    if(location.pathname === '/' || location.pathname === '/register'){
        return null
    }else{
        return(
        <WholeHeader>
            <NavLeft>
                <div>
                    <img alt="profile pic" src={props.user.pfp}/>
                </div>
                <h4>Greetings, {props.user.char_class} {props.user.username}</h4>
                <div>
                    <Link to='/' style={{border: '2px solid black', 
                    backgroundColor: '#fffeee', 
                    width: '80px',
                    height: '18px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}} onClick={props.logoutUser}>Logout</Link>
                </div>
                
            </NavLeft>
            <HomeLink>
                <Link to='/home'>DnD FindMe</Link>
            </HomeLink>
            <NavRight>
                <Link to='/findadventure'>Find Adventures Near You</Link>
                <Link to='/newpost'>Post a Bulletin</Link>
            </NavRight>
        </WholeHeader>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Header);
