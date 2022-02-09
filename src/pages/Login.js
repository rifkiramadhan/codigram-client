import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthState } = useContext(AuthContext); 

    let history = useHistory();

    const login = () => {
        const data = {
            username: username,
            password: password
        };

        axios.post('https://codigram-api.herokuapp.com/auth/login', data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem('accessToken', response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                history.push('/');
            };
        });
    };

    return <div className="loginContainer"> 
                <h1>Selamat Datang, Silahkan Login</h1>
                <div class="formContainer">
                    <label>Username: </label>
                    <input 
                        type="text"
                        placeholder="(Ex. Rifki123...)" 
                        onChange={(event) => {setUsername(event.target.value)}}
                    />
                    
                    <label>Password: </label>
                    <input 
                        type="password" 
                        placeholder="Input Your Password..." 
                        onChange={(event) => {setPassword(event.target.value)}}
                    />

                    <button onClick={login}>Login</button>
                </div>
            </div>;
};

export default Login;
