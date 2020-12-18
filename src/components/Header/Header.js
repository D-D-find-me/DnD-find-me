import React, { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {

    return(
        <div>
            <img alt="profile pic"/>
            <img alt="logo"/>
            <div>
                Put Links here
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(Header);
