import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import logoPost from '../../assets/u-post.png';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { URL } from '../../config/config';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push('/login');
        } else {
            axios.get(`${URL}/posts`, 
                {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                }
            ).then((response) => {
                setListOfPosts(response.data.listOfPosts);
                setLikedPost(response.data.likedPost.map((like) => {
                    return like.PostId;
                }));
            });
        };  
    }, []);

    const likeAPost = (postId) => {
        axios.post(`${URL}/likes`, {
            PostId: postId
        },
        {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        ).then((response) => {
            // Response Liked
            // alert(response.data);

            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return {
                            ...post,
                            Likes: [
                                ...post.Likes, 
                                0
                            ]
                        };
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop();

                        return {
                            ...post,
                            Likes: likesArray
                        };
                    }
                } else {
                    return post;
                }
            }));

            if (likedPost.includes(postId)) {
                setLikedPost(likedPost.filter((id) => {
                    return id !== postId;
                }))
            } else {
                setLikedPost(
                    [
                        ...likedPost,
                        postId
                    ]
                );
            };
        });
    };

    return (
            <div>
                {
                    listOfPosts.map((value, key) => {
                        return (
                            <div className="container">
                                <div className="row mt-5">
                                    <div className="col-xs-12 col-sm-9">
                                        <div 
                                            key={key} className="card card-hover"
                                        >
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <Link 
                                                        to={`/profile/${value.UserId}`}
                                                        className="text-decoration-none"
                                                    >
                                                        <h4 className="fw-bold">
                                                            <img src={logoPost} className="img-thumbnail rounded-circle img-post" alt="Logo Post" /> {value.username}
                                                        </h4>
                                                    </Link>
                                                </div>

                                                <div
                                                    className="rounded-post p-2 mt-4 border-top border-success"
                                                >
                                                    <div className="card-title fw-bold mt-4">
                                                        {value.title}
                                                    </div>
                                                    
                                                    <div 
                                                        className="card-subtitle mb-2 mt-2 post-text-home"
                                                    >
                                                        {value.postText}
                                                    </div>
                                                </div>
                                                
                                                <div className="card-text text-muted">
                                                    <small>
                                                        {value.Likes.length} orang menyukai
                                                    </small>
                                                </div>
                                                
                                                <div className="card-text text-muted mt-4">
                                                    <div className="buttonsHome">
                                                        <label>
                                                            <h4 className="d-flex gap-4">
                                                                <i
                                                                    className={likedPost.includes(value.id) ? "fas fa-thumbs-up unlikeBttn" : "fas fa-thumbs-up likeBttn"}
                                                                    onClick={() => likeAPost(value.id)}
                                                                >
                                                                </i>
                                                                <Link 
                                                                    onClick={() => {history.push(`/post/${value.id}`)}}
                                                                    className="btn btn-sm btn btn-outline-success rounded-pill"
                                                                ><i className="fa-solid fa-comment-dots"></i> Comment

                                                                </Link>
                                                            </h4>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-3">
                                        <div class="card card-hover" width={18}>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item"><small>Penyakit <span className="badge bg-success rounded-pill">{value.case}</span></small></li>
                                                <li class="list-group-item"><small>Konsumsi Obat <span className="badge bg-success rounded-pill">{value.drug}</span></small></li>
                                            </ul>
                                            <div class="card-footer">
                                               <small>Diunggah tanggal <i>{value.createdAt}</i></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
    );
};

export default Home;
