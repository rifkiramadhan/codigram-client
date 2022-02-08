import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push('/login');
        };
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required("You must input a Post!"),
    });

    const onSubmit = (data) => {
        axios.post('https://codigram-api.herokuapp.com/posts', data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')       
            }
        }).then((response) => {
            history.push('/');
        });
    };

    return <div className="createPostPage">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="formContainer">
                        <label>Title: </label>
                        <ErrorMessage name="title" component="span" />
                        <Field 
                            autoComplete="off" 
                            id="inputCreatePost" 
                            name="title" 
                            placeholder="(Ex. Title...)" 
                        />
                        <label>Post: </label>
                        <ErrorMessage name="postText" component="span" />
                        <Field 
                            autoComplete="off" 
                            id="inputCreatePost" 
                            name="postText" 
                            placeholder="(Ex. Post...)" 
                        />

                        <button type="submit">Create Post</button>
                    </Form>
                </Formik>
            </div>;
};

export default CreatePost;
