import './Header.css'
import React from 'react';
import {useState} from 'react';

import {loginRegisterUser, getMeData, getPosts} from '../api';

const Header = (props) => {
    const {username, password, currentUser, posts, setUsername, setPassword, setCurrentUser, setPosts} = props
    const [submitButton, setSubmitButton] = useState('');

    async function submitForm() {
        let user = {
            user: {
                'username': username,
                'password': password
            }
        }
        let success = loginRegisterUser(submitButton, user);
        if(success) {
            setCurrentUser(username);
            let posts = await getPosts();
            setPosts(posts);
        }
    }

    return (
        <header>
            <h1>LOGO GOES HERE</h1>
            {
                currentUser !== ''
                ? (<div className='logged-in-menu'>
                    <h1>{currentUser}</h1>
                    {/* Make dropdown with all posts and messages */}
                    <button onClick={getMeData}>Account</button>
                    <button onClick={() => {
                        setUsername('');
                        setPassword('');
                        setCurrentUser('');
                    }}>Logout</button>
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