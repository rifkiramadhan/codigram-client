import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import logoPost from '../../assets/u-post.png';
import { URL } from '../../config/config';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPost, setLikedPost] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login');
    } else {
      axios.get(
        `${URL}/posts`,
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        },
      ).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPost(response.data.likedPost.map((like) => like.PostId));
      });
    }
  }, [history]);

  const likeAPost = (postId) => {
    axios.post(
      `${URL}/likes`,
      {
        PostId: postId,
      },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      },
    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            return {
              ...post,
              Likes: [
                ...post.Likes,
                0,
              ],
            };
          }
          const likesArray = post.Likes;
          likesArray.pop();

          return {
            ...post,
            Likes: likesArray,
          };
        }
        return post;
      }));

      if (likedPost.includes(postId)) {
        setLikedPost(likedPost.filter((id) => id !== postId));
      } else {
        setLikedPost(
          [
            ...likedPost,
            postId,
          ],
        );
      }
    });
  };

  return (
    <>
      {
            listOfPosts.map((value, key) => (
              <div className="container">
                <div className="row mt-5">
                  <div className="col-xs-12 col-sm-9">
                    <div
                      key={key}
                      className="card"
                    >
                      <div className="card-body">
                        <div className="card-title">
                          <Link
                            to={`/profile/${value.UserId}`}
                            className="text-decoration-none d-flex gap-2"
                          >
                            <div className="card-image">
                              <img src={logoPost} alt="Logo Post" className="img-thumbnail rounded-circle" />
                            </div>
                            <div className="text-wrap">
                              <span className="fw-bold">{value.username}</span>
                              <p className="text-muted">
                                <small>{value.createdAt}</small>
                              </p>
                            </div>
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
                            {value.Likes.length}
                            {' '}
                            orang menyukai
                          </small>
                        </div>
                        <div className="card-text text-muted mt-4">
                          <div className="buttonsHome">
                            <div className="d-flex align-items-center justify-content-center gap-5">
                              <h2>
                                <i
                                  className={likedPost.includes(value.id) ? 'fas fa-thumbs-up unlikeBttn' : 'fas fa-thumbs-up likeBttn'}
                                  onClick={() => likeAPost(value.id)}
                                />
                              </h2>
                              <Link
                                onClick={() => { history.push(`/post/${value.id}`); }}
                                className="btn btn-md btn btn-outline-success fw-bold rounded-pill"
                              >
                                <i className="fa-solid fa-comment-dots" />
                                {' '}
                                Comment
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-3">
                    <div className="card card-hover" width={18}>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <small>
                            Penyakit
                            {' '}
                            <span className="badge bg-success rounded-pill">{value.case}</span>
                          </small>
                        </li>
                        <li className="list-group-item">
                          <small>
                            Konsumsi Obat
                            {' '}
                            <span className="badge bg-success rounded-pill">{value.drug}</span>
                          </small>
                        </li>
                      </ul>
                      <div className="card-footer" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
    </>
  );
}

export default Home;
