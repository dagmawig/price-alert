import React, { useState } from 'react';
import './PassReset.css';
import { Link } from 'react-router-dom';
import { auth } from './FirebaseConfig';

function Reset() {

    const [email, getEmail] = useState('');

    // function handling user password reset
    const resetPass = (e) => {

        e.preventDefault();

        auth.sendPasswordResetEmail(email).then(() => {
            alert(`Password reset link sent to ${email}.`);
            getEmail("");
            document.getElementById("login_link").click();
        }).catch(err => alert(err.message));
    }

    return (
        <div className="reset row">
            <div className="reset_form col-sm-5">
                <form>
                    <h3>Amazon Price Alert</h3>
                    <h4>Reset Password</h4>
                    <br />
                    <div className="form-group">
                        <label for="email"><b>Email</b></label>
                        <input type="email" className="form-control" placeholder="email" onChange={(e) => getEmail(e.target.value)}></input>
                    </div>
                    <br />
                    <button type="submit" onClick={resetPass} className="reset_pass btn btn-warning">
                        Reset Password <i className="fa fa-key"></i>
                    </button>
                    <br /><br />
                    <div>
                        <Link to="/signup">
                            <a>New user? Create account here.</a>
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <a id="login_link">Remember password? Sign in here.</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Reset;
