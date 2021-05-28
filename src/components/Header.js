import './Header.css'
import React from 'react';
import {useState} from 'react';

import {loginRegisterUser, getMeData} from '../api';

const Header = (props) => {
    const {username, password, setUsername, setPassword} = props
    const [submitButton, setSubmitButton] = useState('');

    function submitForm() {
        let user = {
            user: {
                'username': username,
                'password': password
            }
        }
        loginRegisterUser(submitButton, user);
    }

    return (
        <header>
            <h1>LOGO GOES HERE</h1>
            <button onClick={() => {
                getMeData()
            }}>My Data</button>
            <form className='signup-login' onSubmit={(event) => {
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
            </form>
        </header>
    )
}

export default Header