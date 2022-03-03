import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import { URL } from '../../config/config';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        axios.put(`${URL}/auth/changepassword`,
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
          )
          .then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            }
          });
    };
    
    return (
            <div className="container">
                <h1 className="text-center text-dark fw-bold mt-5 pt-5">Change Password Account</h1>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="container-form card-form-user m-5 p-5">
                        <form className="row d-flex align-items-center justify-content-center">
                            <div className="row mb-3 d-grid">
                                <label className="text-dark fw-normal col-form-label">Old Password: </label>
                                <div className="col-sm-12">
                                    <input 
                                        type="text" 
                                        placeholder="Input your old password"
                                        className="form-control rounded-pill" 
                                        onChange={(event) => {setOldPassword(event.target.value)}} 
                                    />
                                </div>
                            </div>

                            <div className="row mb-3 d-grid">
                                <label className="text-dark fw-normal col-form-label">New Password: </label>
                                <div className="col-sm-12">
                                    <input 
                                        type="password" 
                                        placeholder="Your new password"
                                        className="form-control rounded-pill"
                                        onChange={(event) => {setNewPassword(event.target.value)}} 
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="row mt-5 d-flex align-items-center justify-content-center">
                            <div className="row mb-3 d-grid">
                                <div className="col-sm-12">
                                    <button
                                        type="password"
                                        className="btn btn-lg btn-success rounded-pill w-100"
                                        onClick={changePassword}
                                    >Save Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ChangePassword;
