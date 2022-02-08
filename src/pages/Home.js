import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push('/login');
        } else {
            axios.get('https://codigram-api.herokuapp.com/posts', 
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
        axios.post('https://codigram-api.herokuapp.com/likes', {
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
                    return id != postId;
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

    return <div>
                {
                    listOfPosts.map((value, key) => {
                        return <div key={key} className="post">
                                    <div className="title">
                                        {value.title}
                                    </div>
                                    <div className="body"
                                        onClick={() => {history.push(`/post/${value.id}`)}}
                                    >
                                            {value.postText}
                                    </div>
                                    <div className="footer">
                                        <div className="username">
                                            <Link to={`/profile/${value.UserId}`}>
                                                {value.username}
                                            </Link>
                                        </div>
                                        <div className="buttons">
                                            <i
                                                className={likedPost.includes(value.id) ? "fas fa-thumbs-up unlikeBttn" : "fas fa-thumbs-up likeBttn"}
                                                onClick={() => likeAPost(value.id)}
                                            >
                                            </i>
                                            
                                            <label>{value.Likes.length}</label>
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>;
};

export default Home;
