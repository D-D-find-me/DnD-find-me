import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const WholeHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #effdee;
    width: 100vw;
    height: 15vh;
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

const Header = (props) => {
    const location = useLocation()
    if(location.pathname === '/' || location.pathname === '/register'){
        return null
    }else{
        return(
        <WholeHeader>
            <NavLeft>
                <div>
                    {props.user.pfp === 'img.jpeg' ?
                    null :
                    <img alt="profile pic" src={props.user.pfp}/>}
                </div>
                <h4>Greetings, {props.user.char_class} {props.user.username}</h4>
                {/* had to do inline styling because Link cannot be a styled tag */}
                <Link to='/' style={{border: '2px solid black', 
                backgroundColor: '#fffeee', 
                width: '80px',
                height: '18px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}} onClick={props.logoutUser}>Logout</Link>
            </NavLeft>
            <div>
                <Link to='/home'><h2>D&D Find Me</h2></Link>
            </div>
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
