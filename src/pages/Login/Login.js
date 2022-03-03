import React, { useState, useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import Swal from 'sweetalert2';
import { URL } from '../../config/config';

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

        axios.post(`${URL}/auth/login`, data).then((response) => {
            if (response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal!',
                    text: `${response.data.error}`,
                });
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

    return (
        <>
            <h1 className="text-center text-dark fw-bold mt-5 pt-5">Sign In Account</h1>
            <div className="container d-flex align-items-center justify-content-center"> 
                <div className="container-form card-form-user m-5 p-5">
                    <form className="row d-flex align-items-center justify-content-center">

                        <div className="row mb-3 d-grid">
                            <label className="text-dark col-sm-2 fw-normal col-form-label">Username: </label>
                            <div className="col-sm-12">                           
                                <input 
                                    type="text"
                                    placeholder="Input your username"
                                    className="form-control rounded-pill" 
                                    onChange={(event) => {setUsername(event.target.value)}}
                                />                            
                            </div>
                        </div>

                        <div className="row mb-3 d-grid ">
                            <label className="text-dark col-sm-2 fw-normal col-form-label">Password: </label>
                            <div className="col-sm-12">                           
                                <input 
                                    type="password"
                                    placeholder="Your password"
                                    className="form-control rounded-pill" 
                                    onChange={(event) => {setPassword(event.target.value)}}
                                />                            
                            </div>
                        </div>

                    </form>
                    <div className="row mt-5 d-flex align-items-center justify-content-center">
                        <div className="row d-grid">    
                            <div className="col-sm-12">
                                <button 
                                    type="submit"
                                    className="btn btn-md btn-success fw-bold rounded-pill w-100" 
                                    onClick={login}
                                >Sign In
                                </button>
                            </div>
                            <p className="mt-20">
                                Belum memiliki akun ?
                                <Link 
                                    to="/login"
                                    className="fw-bold text-secondary text-decoration-none"
                                > Sign Up Here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
