import './Header.css'
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {loginRegisterUser, getMeData, getPosts} from '../api';
import {setLocalStorage} from '../utils'

const Header = (props) => {
    const {username, password, currentUser, posts, setUsername, setPassword, setCurrentUser, setPosts, setAccountData} = props
    const [submitButton, setSubmitButton] = useState('');

    async function submitForm() {
        let user = {
            user: {
                'username': username,
                'password': password
            }
        }
        
        let returnToken = await loginRegisterUser(submitButton, user);

        if(returnToken) {
            await setCurrentUser(username);
            let posts = await getPosts();
            let data = await getMeData();
            setPosts(posts);
            setAccountData(data);
            setLocalStorage('token',returnToken);
            setLocalStorage('user', username);
        }
    }

    return (
        <header>
            <h1>LOGO GOES HERE</h1>
            {
                currentUser !== ''
                ? (<div className='logged-in-menu'>
                    {/* Make dropdown with all posts and messages */}
                    <Link className='btn' to='/me'>{currentUser.toUpperCase()}</Link>
                    {/* <button onClick={getMeData}>{currentUser.toUpperCase()}</button> */}
                    <button onClick={() => {
                        setUsername('');
                        setPassword('');
                        setCurrentUser('');
                        setLocalStorage('token','');
                        setLocalStorage('user', '');
                    }}>LOGOUT</button>
                </div>)
                : (<form className='signup-login' onSubmit={(event) => {
                    event.preventDefault();
                    submitForm();
                }}>
                    <div className='input-group'>
                        <label htmlFor='username-input'>Username</label>
                        <input type='text' placeholder='Username...' id='username-input' onChange={(event) => {
                            setUsername(event.target.value);
                        }}></input>
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password-input'>Password</label>
                        <input type='password' placeholder='Password...' id='password-input' onChange={(event) => {
                            setPassword(event.target.value);
                        }}></input>
                    </div>
                    <button id='login' onClick={(event) => {
                        setSubmitButton(event.target.id);
                    }}>Login</button>
                    <button id='register' onClick={(event) => {
                        setSubmitButton(event.target.id);
                    }}>Register</button>
                </form>)
            }
        </header>
    )
}

export default Header