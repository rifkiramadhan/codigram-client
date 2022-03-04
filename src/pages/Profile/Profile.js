import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import logo from '../../assets/se.png';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { URL } from '../../config/config';

function Profile() {
    let { id } = useParams();
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${URL}/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`${URL}/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
            <div className="container">
                <div className="row">
                    <h1 className="text-center text-dark fw-bold mb-5 mt-5 pt-5">Profile Saya</h1>
                    <div className="col-md-12 card-profile mb-5">
                            <div className="img-name text-center">
                                <img
                                    src={logo}
                                    alt="User" 
                                    />
                                <h2>{username}</h2>
                                <span>Software Engineer</span>
                            </div>

                            
                            <div className="card-body">
                                {authState.username === username && (
                                    <button 
                                        className="btn btn-primary btn-sm fw-bold rounded-pill"
                                        onClick={() => {history.push('/changepassword')}}
                                    >Change Password
                                    </button>
                                )}
                            </div>

                            <div className="row m-2 d-flex justify-content-center gap-2">
                            {
                                listOfPosts.map((value, key) => {
                                    return (
                                            <div 
                                                key={key} className="border card-profile-post border-secondary bg-light col-xs-12 col-sm-5 p-4"
                                                onClick={() => {history.push(`/post/${value.id}`)}}
                                            >
                                                {/* <div className="card-text">
                                                    <h4 className="fw-bold">
                                                        <i className="fa-solid fa-circle-user fw-bold"></i> {value.username}
                                                    </h4>
                                                    <small className="text-muted">{date}</small>
                                                </div>
                                                <div className="card-title mt-4 fw-bold">
                                                    {value.title}
                                                </div> */}

                                                <div className="d-flex gap-2">
                                                    <h1>
                                                        <i className="fa-solid fa-circle-user fw-bold"></i> 
                                                    </h1>
                                                    <h6 className="wrap-text">
                                                        <div className="fw-bold">
                                                            {value.username}
                                                        </div>
                                                        <p className="text-muted">
                                                            <small>{date}</small>
                                                        </p>
                                                    </h6>
                                                </div>

                                                <div 
                                                    className="card-text"
                                                >
                                                    {value.postText}
                                                </div>
                                                <div className="card-text mt-4">
                                                    <div className="card-text">
                                                        <small>
                                                            <i className="fa-solid fa-thumbs-up"></i> {value.Likes.length} orang menyukai
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Profile;
