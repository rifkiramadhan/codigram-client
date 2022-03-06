import React, { useState, useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../helpers/AuthContext';
import { URL } from '../../config/config';
import { Footer, Jumbotron } from '../../components';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const login = () => {
    const data = {
      username,
      password,
    };

    setLoading(true);

    axios.post(`${URL}/auth/login`, data).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal!',
          text: `${response.data.error}`,
        });
        setLoading(false);
      } else {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push('/');
        setLoading(false);
      }
    });
  };

  return (
    <div className="container-fluid">
      <Jumbotron />
      <h1 className="text-center text-dark fw-bold mt-5 pt-5">Sign In Account</h1>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="container-form card-form-user m-5 p-5">
          <form className="row d-flex align-items-center justify-content-center">

            <div className=" row mb-3 d-grid">
              <label className="text-dark col-sm-2 fw-normal col-form-label">Username: </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  placeholder="Input your username"
                  className="form-control rounded-pill"
                  onChange={(event) => { setUsername(event.target.value); }}
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
                  onChange={(event) => { setPassword(event.target.value); }}
                />
              </div>
            </div>

          </form>
          <div className="row mt-5 d-flex align-items-center justify-content-center">
            <div className="row d-grid">
              <div className="col-sm-12">
                {
                    loading ? (
                      <button
                        type="submit"
                        className="btn btn-md btn-success fw-bold rounded-pill w-100"
                        disabled
                      >
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        {' '}
                        Loading ...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-md btn-success fw-bold rounded-pill w-100"
                        onClick={login}
                      >
                        <i className="fa-solid fa-right-to-bracket" />
                        {' '}
                        Sign In
                      </button>
                    )
                }
              </div>
              <small className="mt-2 text-center">
                Belum memiliki akun ?
                <Link
                  to="/registration"
                  className="fw-bold text-secondary text-decoration-none"
                >
                  {' '}
                  Sign Up Here
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
