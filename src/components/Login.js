import React, { useState } from 'react';
import './Login.css';
import { auth } from './FirebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserID } from './priceSlice';
import { Link } from 'react-router-dom'

function Login() {

    const dispatch = useDispatch();
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        console.log('signnnn')
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {

                let user = auth.currentUser;
                console.log(user);
                if (user.emailVerified) {

                    localStorage.setItem("userID", user.uid);

                    dispatch(setUserID(user.uid));

                    window.location.reload();
                }
                else {
                    user.sendEmailVerification();
                    alert(`Email not verified.\nVerification link sent to ${email}.\nPlease verify your email.`);
                    auth.signOut();
                }
            }).catch((error) => alert(error.message));

    }



    return (
        <div className="login row">
            <div className="login_form col-sm-6">
                <form>
                    <h3>Welcome To Amazon Price Alert</h3>
                    <br/>
                    Email<br/>
                    <input type="email" size="22" onChange={(e)=>getEmail(e.target.value)}/><br/><br/>
                    Password<br/>
                    <input type="password" size="22" onChange={(e)=>getPassword(e.target.value)}/><br/><br/>
                    <button type="submit" onClick={signIn} className="login_signIn btn btn-warning">
                        Sign In <i className="fa fa-sign-in"></i>
                    </button>
                    <br/><br/>
                    <div>
                        <Link to="/signup">
                            <a>New user? Create account here.</a>
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

export default Login;
