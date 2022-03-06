import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL } from '../../config/config';

function CreatePost() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const initialValues = {
    title: '',
    postText: '',
    case: '',
    drug: '',
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login');
    }
  }, [history]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a Title!'),
    postText: Yup.string().required('You must input a Post!'),
    case: Yup.string().required('You must input a Case!'),
    drug: Yup.string().required('You must input a Drug!'),
  });

  const onSubmit = (data) => {
    setLoading(true);

    axios.post(`${URL}/posts`, data, {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Anda berhasil memposting pesan',
        showConfirmButton: false,
        timer: 1500,
      });

      history.push('/');
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center fw-bold">Buat Postingan</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="card-form mb-3 p-5 m-5 mt-5 row g-3 d-flex align-items-center justify-content-center">
          <div className="row mb-3 d-flex align-items-center justify-content-center">
            <div className="col-sm-10">
              <label className="col-sm-2 col-form-label">Keluhan: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost"
                name="title"
                className="form-control rounded-pill"
                placeholder="Input your complaint"
              />
              <ErrorMessage name="title" component="span" />
            </div>
          </div>
          <div className="row mb-3 d-flex align-items-center justify-content-center">
            <div className="col-sm-10">
              <label className="col-sm-2 col-form-label">Penjelasan: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost"
                name="postText"
                as="textarea"
                className="form-control rounded-desc"
                placeholder="Your description"
              />
              <ErrorMessage name="postText" component="span" />
            </div>
          </div>
          <div className="row mb-3 d-flex align-items-center justify-content-center">
            <div className="col-sm-10">
              <label className="col-sm-2 col-form-label">Penyakit: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost"
                as="select"
                name="case"
                className="form-select rounded-pill"
              >
                <option selected>-- Select your case --</option>
                <option value="Asam Lambung">Asam Lambung</option>
                <option value="Batuk dan Pilek">Batuk dan Pilek</option>
                <option value="Batuk Kering">Batuk Kering</option>
                <option value="Cacar Air">Cacar Air</option>
                <option value="Biduran">Biduran</option>
                <option value="Demam Berdarah">Demam Berdarah</option>
                <option value="Demam Tinggi">Demam Tinggi</option>
                <option value="Sakit Kepala">Sakit Kepala</option>
                <option value="Kanker">Kanker</option>
                <option value="Tumor">Tumor</option>
                <option value="Jantung">Jantung</option>
                <option value="Hal lain">Hal lain</option>
              </Field>
              <ErrorMessage name="case" component="span" />
            </div>
          </div>
          <div className="row mb-3 d-flex align-items-center justify-content-center">
            <div className="col-sm-10">
              <label className="col-sm-2 col-form-label">Konsumsi Obat: </label>
              <Field
                autoComplete="off"
                id="inputCreatePost"
                name="drug"
                className="form-control rounded-pill"
                placeholder="Your drug"
              />
              <ErrorMessage name="drug" component="span" />
            </div>
          </div>
          <div className="row d-flex align-items-center justify-content-center mt-5">
            <div className="col-sm-10">

              {
                    loading ? (
                      <button
                        className="btn btn-success btn-md fw-bold rounded-pill w-100"
                        type="submit"
                        disabled
                      >
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        {' '}
                        Loading ...
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-md fw-bold rounded-pill w-100"
                        type="submit"
                      >
                        <i className="fa-solid fa-paper-plane" />
                        {' '}
                        Posting
                      </button>
                    )
                }

            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
