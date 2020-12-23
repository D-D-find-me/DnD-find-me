import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';

const Header = (props) => {
    const location = useLocation()
    console.log(props)
    if(location.pathname === '/' || location.pathname === '/register'){
        return null
    }else{
        return(
        <div>
            <div>
                <img alt="profile pic"/>
                <h3>Greetings, {/*username*/}</h3>
                <Link to='/' onClick={props.logoutUser}>Logout</Link>
            </div>
                <Link to='/home'><h1>D&D Find Me</h1></Link>
            <div>
                <Link to='/findadventure'>Find Adventurers Near You</Link>
                <br/>{/* <-- this is only here so you can see the two different links on the page, you can delete this*/}
                <Link to='/newpost'>Post a Bulletin</Link>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Header);
