import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("You must input a Author!"),
        password: Yup.string().min(4).max(20).required("You must input a Author!")
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data).then(() => {
            console.log(data);
        });
    };

    return <div className="loginContainer">
                <h1>Selamat Datang, Silahkan Daftar</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="formContainer">
                        <label>Username: </label>
                        <ErrorMessage name="username" component="span" />
                        <Field 
                            autoComplete="off" 
                            id="inputCreatePost" 
                            name="username" 
                            placeholder="(Ex. Rifki123...)" 
                        />
                        <label>Password: </label>
                        <ErrorMessage name="password" component="span" />
                        <Field 
                            autoComplete="off"
                            type="password"
                            id="inputCreatePost" 
                            name="password" 
                            placeholder="Input Your Password..." 
                        />

                        <button type="submit">Register</button>
                    </Form>

                    
                </Formik>
            </div>;
};

export default Registration;
