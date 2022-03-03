import React, { useContext, useEffect } from 'react';
import './CreatePost.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import Swal from 'sweetalert2';
import { URL } from '../../config/config';

function CreatePost() {
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
        case: "",
        drug: ""
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push('/login');
        };
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required("You must input a Post!"),
        case: Yup.string().required("You must input a Case!"),
        drug: Yup.string().required("You must input a Drug!"),
    });

    const onSubmit = (data) => {
        axios.post(`${URL}/posts`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')       
            }
        }).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Anda berhasil memposting pesan',
                showConfirmButton: false,
                timer: 1500
            });
            
            history.push('/');
        });
    };

    return (
            <div className="container">
                <h1 className="mt-5 text-center fw-bold">Buat Postingan</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="card-form mb-3 p-5 m-5 mt-5 row g-3 mt-20">
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
                                    className="form-control rounded-pill" 
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
                                    name="case"
                                    className="form-control rounded-pill" 
                                    placeholder="Your case" 
                                />
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
                                <button
                                    className="btn btn-success btn-md fw-bold rounded-pill w-100"
                                    type="submit"
                                ><i className="fa-solid fa-paper-plane"></i> Posting
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
     );
};

export default CreatePost;
