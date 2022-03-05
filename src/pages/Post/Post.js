import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import logoPost from '../../assets/u-post.png';
import logoComment from '../../assets/u-comment.png';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import Swal from 'sweetalert2';
import { URL } from '../../config/config';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        axios.get(`${URL}/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`${URL}/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios.post(`${URL}/comments`, {
            commentBody: newComment,
            PostId: id
        },
        {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        )
        .then((response) => {
            if (response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Posting Komentar Gagal!',
                    text: `${response.data.error}`,
                });
            } else {
                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username,
                };
    
                setComments([...comments, commentToAdd]);
                setNewComment('');

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Anda berhasil posting komentar',
                    showConfirmButton: false,
                    timer: 1500
                });
            };
            window.location.reload();
        });
    };

    const deleteComment = (id) => {
        axios.delete(`${URL}/comments/${id}`, { 
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
                setComments(
                    comments.filter((val) => {
                    return val.id !== id;
                })
            );

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Anda berhasil menghapus komentar',
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    const deletePost = () => {
        axios.delete(`${URL}/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Anda berhasil menghapus pesan',
                showConfirmButton: false,
                timer: 1500
            });
            history.push('/');
        });
    };

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt('Enter New Title: ');
            axios.put(`${URL}/posts/title`, {
                newTitle: newTitle,
                id: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });

            setPostObject({
                ...postObject,
                title: newTitle
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Anda berhasil memperbaharui keluhan',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let newPostText = prompt('Enter New Text: ');
            axios.put(`${URL}/posts/postText`, {
                newText: newPostText,
                id: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });

            setPostObject({
                ...postObject,
                postText: newPostText
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Anda berhasil memperbaharui penjelasan',
                showConfirmButton: false,
                timer: 1500
            });
        };
    };

    return (
        <>
            <h1 className="text-center fw-bold mt-5">Detail Post</h1>
            <div className="container">
                <div className="row mt-5 d-flex justify-content-center gap-3">
                    <div className="card card-body col-xs-12 col-sm-6">
                        <div className="card-text">
                        <Link 
                            to={`/profile/${postObject.UserId}`}
                            className="text-decoration-none d-flex gap-2"
                        >
                            <div className="card-image">
                                <img src={logoPost} alt="Logo Post" class="img-thumbnail rounded-circle" />
                            </div>
                            <div className="text-wrap">
                                <span className="fw-bold">{postObject.username}</span>
                                <p className="text-muted">
                                    <small>{postObject.createdAt}</small>
                                </p>
                            </div>
                        </Link>
                            {' '}
                        </div>

                        <div 
                            className="card-title mt-2"
                        >
                            <blockquote className="block-title">
                                {postObject.title}
                            </blockquote>
                        </div>

                        <div 
                            className="card-text mt-2 edit rounded-body" 
                        >
                            <section class="blockquote-section">
                                <blockquote class="classy-bq">
                                    <p>
                                        {postObject.postText}
                                    </p>
                                </blockquote>
                            </section>
                        </div>

                        {authState.username === postObject.username && (
                        <div className="d-flex bd-highlight mt-4">
                            <div className="bd-highlight">
                                <Link 
                                    onClick={() => {
                                        if (authState.username === postObject.username) {
                                            editPost('title');
                                        };
                                    }}
                                    className="card-link btn btn-sm btn-primary rounded-pill"
                                ><i className="fa-solid fa-pen-to-square"></i> Edit Title
                                </Link>
                                <Link 
                                    onClick={() => {
                                        if (authState.username === postObject.username) {
                                            editPost('body');
                                        };
                                    }}
                                    className="card-link btn btn-sm btn-primary rounded-pill"
                                ><i className="fa-solid fa-pen-to-square"></i> Edit Post
                                </Link>
                            </div>
                            <div className="ms-auto bd-highlight">
                                <Link
                                    className="btn btn-sm btn-danger rounded-pill"
                                    onClick={() => {deletePost(postObject.id)}}
                                ><i className="fa-solid fa-trash"></i> Hapus
                                </Link>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="card col-xs-12 col-sm-3">
                        <h5 className="fw-bold m-3 text-center">Comment</h5>
                        <div className="card-body">
                            <textarea 
                                type="text" 
                                placeholder="Input your comment"
                                className="form-control rounded-textarea mb-5 d-block" 
                                autoComplete="off" 
                                value={newComment}
                                onChange={(event) => {setNewComment(event.target.value)}}
                            />
                            <div className="d-flex bd-highlight mt-4">
                                <div className="ms-auto p-2 bd-highlight">
                                    <button 
                                        className="btn btn-sm btn-success rounded-pill"
                                        onClick={addComment}
                                    ><i className="fa-solid fa-paper-plane"></i> Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-comment">
                        <div className="card-body">
                            {
                                comments.map((comment, key) => {
                                    return (
                                            <div key={key} className="card-title mt-5 border-start border-success bg-light rounded-comment">
                                                <div className="m-2 p-2">
                                                    <div className="d-flex gap-2">
                                                        <div className="card-image">
                                                            <img src={logoComment} alt="Logo Post" class="img-thumbnail rounded-circle" />
                                                        </div>
                                                        <div className="card-text">
                                                            <span className="fw-bold">{comment.username}</span>
                                                            <p className="text-muted">
                                                                <small>
                                                                    {comment.createdAt}
                                                                </small>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {' '}
                                                    <div className="card-text mt-3">
                                                        {comment.commentBody}
                                                    </div>
                                                    {' '}
                                                    {
                                                        authState.username === comment.username &&
                                                        <>
                                                            <div className="d-flex bd-highlight">
                                                                <div className="ms-auto p-2 bd-highlight">
                                                                <button 
                                                                    className="btn btn-sm btn-danger rounded-pill"
                                                                    onClick={() => {deleteComment(comment.id)}}
                                                                ><i className="fa-solid fa-trash"></i> Hapus
                                                                </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                    )
                                })
                            }
                        </div>     
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
