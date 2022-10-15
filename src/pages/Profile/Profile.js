import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import logoPatient from '../../assets/patient.png';
import logoDoctor from '../../assets/doctor.png';
import logoPost from '../../assets/u-post.png';
import { AuthContext } from '../../helpers/AuthContext';
import { URL } from '../../config/config';

function Profile() {
  const { id } = useParams();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${URL}/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
      setRole(response.data.role);
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
            {
              role === 'Dokter Specialist' && 'Dokter Umum' && (
                <img
                  src={logoDoctor}
                  alt="Doctor"
                />
              )
            }

            {
              role === 'Pasien Konsultasi' && 'Pasien Sakit' && (
                <img
                  src={logoPatient}
                  alt="Patient"
                />
              )
            }
            <h2 className="mt-2">
              {username}
            </h2>
            <div className="d-flex justify-content-center">
              <div className="badge bg-success rounded-pill d-flex align-items-center gap-2">
                <span>
                  {role}
                </span>
                {
                  role === 'Dokter Specialist' && (
                    <span className="badge bg-primary rounded-pill border border-1">
                      <i className="fa-solid fa-check" />
                    </span>
                  )
                }
              </div>
            </div>
            <div className="card-body">
              {authState.username === username && (
              <Link
                className="btn btn-primary btn-sm fw-bold rounded-pill mt-2"
                onClick={() => { history.push('/changepassword'); }}
              >
                <i className="fa-solid fa-gear" />
                {' '}
                Change Password
              </Link>
              )}
            </div>
          </div>

          <div className="row m-4 d-flex justify-content-center gap-2">
            {
                listOfPosts.map((value, key) => (
                  <div
                    key={key}
                    className="border card-profile-post border-secondary bg-light col-xs-12 col-sm-5 p-4"
                  >
                    <div className="d-flex gap-2">
                      <div className="card-image">
                        <img src={logoPost} alt="Logo Post" className="img-thumbnail rounded-circle" />
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
                          <i className="fa-solid fa-thumbs-up" />
                          {' '}
                          {value.Likes.length}
                          {' '}
                          orang menyukai
                        </small>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Link
                          onClick={() => { history.push(`/post/${value.id}`); }}
                          className="btn btn-sm btn btn-outline-success rounded-pill"
                        >
                          <i className="fa-solid fa-comment-dots" />
                          {' '}
                          Comment
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
