import React, { useState } from 'react';
import './Registration.css';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL } from '../../config/config';
import { Footer, Jumbotron } from '../../components';

function Registration() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required('You must input a Username!'),
    password: Yup.string().min(4).max(20).required('You must input a Password!'),
  });

  const onSubmit = (data) => {
    setLoading(true);

    axios.post(`${URL}/auth`, data).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Gagal!',
          text: `${response.data.error}`,
        });
        setLoading(false);
      } else {
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Anda berhasil mendaftar akun',
          showConfirmButton: false,
          timer: 1500,
        });
        history.push('/login');
        setLoading(false);
      }
    });
  };

  return (
    <div className="container-fluid">
      <Jumbotron />
      <h1 className="text-center text-dark fw-bold mt-5 pt-5">Sign Up Account</h1>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="container-form card-form-user m-5 p-5">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="row g-3 mt-1 d-flex align-items-center justify-content-center">
              <div className="row mb-3 d-grid ">
                <label className="text-dark col-sm-2 fw-normal col-form-label">Username: </label>
                <div className="col-sm-12">
                  <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    name="username"
                    className="form-control rounded-pill"
                    placeholder="Input your username"
                  />
                </div>
                <ErrorMessage name="username" component="span" />
              </div>
              <div className="row mb-3 d-grid ">
                <label className="text-dark col-sm-2 fw-normal col-form-label">Password: </label>
                <div className="col-sm-12">
                  <Field
                    autoComplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password"
                    className="form-control rounded-pill"
                    placeholder="Your password"
                  />
                </div>
                <ErrorMessage name="password" component="span" />
              </div>
              <div className="row mt-5 d-grid">
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
                        >
                          <i className="fa-solid fa-arrow-right-to-bracket" />
                          {' '}
                          Sign Up
                        </button>
                      )
                  }

                </div>
                <small className="mt-2 text-center">
                  Sudah memiliki akun ?
                  <Link
                    to="/login"
                    className="fw-bold text-secondary text-decoration-none"
                  >
                    {' '}
                    Sign In Here
                  </Link>
                </small>
              </div>
            </Form>

          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Registration;
