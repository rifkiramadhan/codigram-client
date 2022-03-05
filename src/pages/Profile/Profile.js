import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import logo from '../../assets/se.png';
import logoPost from '../../assets/u-post.png';
import { useParams, useHistory, Link } from 'react-router-dom'
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
    }, [id]);

    return (
            <div className="container">
                <div className="row">
                    <h1 className="text-center text-dark fw-bold mb-5 mt-5 pt-5">Profile</h1>
                    <div className="col-md-12 card-profile mb-5">
                            <div className="img-name text-center">
                                <img
                                    src={logo}
                                    alt="User" 
                                    />
                                <h2 className="mt-2">
                                    {username}
                                </h2>
                                <span>Software Engineer</span>
                                <div className="card-body">
                                    {authState.username === username && (
                                        <button 
                                            className="btn btn-primary btn-sm fw-bold rounded-pill mt-2"
                                            onClick={() => {history.push('/changepassword')}}
                                        ><i className="fa-solid fa-gear"></i> Change Password
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="row m-4 d-flex justify-content-center gap-2">
                            {
                                listOfPosts.map((value, key) => {
                                    return (
                                            <div 
                                                key={key} className="border card-profile-post border-secondary bg-light col-xs-12 col-sm-5 p-4"
                                            >
                                                <div className="d-flex gap-2">
                                                    <div className="card-image">
                                                        <img src={logoPost} alt="Logo Post" class="img-thumbnail rounded-circle" />
                                                    </div>
                                                    <div className="card-text">
                                                        <span className="fw-bold">{value.username}</span>
                                                        <p className="text-muted">
                                                            <small>{value.createdAt}</small>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="card-title mt-2 fw-bold">
                                                    {value.title}
                                                </div>

                                                <div 
                                                    className="card-text post-text"
                                                >
                                                    {value.postText}
                                                </div>
                                                <div className="card-text mt-4">
                                                    <div className="card-text d-flex">
                                                        <small>
                                                            <i className="fa-solid fa-thumbs-up"></i> {value.Likes.length} orang menyukai
                                                        </small>
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <Link
                                                            onClick={() => {history.push(`/post/${value.id}`)}}
                                                            className="btn btn-sm btn btn-outline-success rounded-pill"
                                                        ><i className="fa-solid fa-comment-dots"></i> Comment
                                                        </Link>
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
