import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('/api/login', { username, password })
            props.loginUser(user.data)
            history.push('/home')
        }
        catch (err) {
            console.log(err)
        }
    };

    // Need register method here:
    // const register = async (e) => {

    // }

    return (
        <div>
            <h1>
                <h1>DnD FindMe</h1>
            </h1>
            <div>
                <form>
                    <div>
                        <div>Username:  
                            <input
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div>Password:  
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <div>
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                    <button onClick={e => login(e)}>Enter, Friend</button>
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser })(Login);