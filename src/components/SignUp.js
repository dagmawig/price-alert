import React, { useState } from 'react';
import './SignUp.css';
import { auth } from './FirebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserID } from './priceSlice';
import { Link } from 'react-router-dom';

function SignUp() {

    const dispatch = useDispatch();
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [valid, isValid] = useState(null);
    const signUp = (e) => {
        e.preventDefault();

        if(valid) return;

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = auth.currentUser;
                user.sendEmailVerification()
                    .then(function () {
                        auth.signOut();
                        alert(`Verification link sent to ${email}. \n Please click on the link to verify your email and log into your acount.`);
                        isValid(true);
                        document.getElementById("signup").click();
                    }).catch(function (e) {
                        alert(e);
                    });
            })
            .catch((error) => alert(error.message));

    }



    return (
        <div className="sign_up row">
            <div className="sign_up_form col-sm-6">
                <form>
                    <h3>Sign Up For Amazon Price Alert</h3>
                    <br />
                    Email<br />
                    <input type="email" size="22" onChange={(e) => getEmail(e.target.value)} /><br /><br />
                    Password<br />
                    <input type="password" size="22" onChange={(e) => getPassword(e.target.value)} /><br /><br />
                    <button type="submit" onClick={signUp} className="sign_up_button btn btn-warning">
                        <Link to={(valid) ? "/" : "/signup"} className="signUp_link" id="signup">
                            Sign Up <i className="fa fa-user-plus"></i>
                        </Link>
                    </button>
                    <br /><br />
                    <div>
                        <Link to="/">
                            <a>Existing user? Sign in here.</a>
                        </Link>
                    </div>
                    <div>
                        <Link to="/reset">
                            <a>Forgot password? Reset password here.</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;