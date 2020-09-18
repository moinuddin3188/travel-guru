import React, { useState, useContext } from 'react';
import './Login.css';
import fb from '../../Fakedata/Images/fb.png'
import google from '../../Fakedata/Images/google.png'
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../Firebase/Firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import NavbarWhite from '../Navbar/Navbar';



firebase.initializeApp(firebaseConfig);


const Login = () => {

    const [newUser, setNewUser] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState({
        password: "",
        isPasswordMatch: false,
        error: ""
    });

    const [user, setUser] = useContext(UserContext);
    const [forgetPassword, setForgetPassword] = useState(false);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = e => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
            setPasswordMatch({ ...passwordMatch, password: e.target.value });
        }
        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    }

    const handleChange = e => {
        e.target.value === passwordMatch.password ?
            setPasswordMatch({ ...passwordMatch, isPasswordMatch: true, error: "" }) :
            setPasswordMatch({ ...passwordMatch, isPasswordMatch: false, error: "password don't match" })
    }

    const handleLogin = e => {
        if (newUser && passwordMatch.isPasswordMatch && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfo = { ...user };
                    userInfo.error = "";
                    userInfo.success = true;
                    userInfo.userName = user.firstName;
                    setUser(userInfo);
                    updateUserName(user.firstName);
                    history.replace(from);
                })
                .catch(function (error) {
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    var user = firebase.auth().currentUser;
                    const userInfo = { ...user };
                    userInfo.error = "";
                    userInfo.success = true;
                    userInfo.userName = user.displayName;
                    setUser(userInfo);
                    history.replace(from);
                })
                .catch(function (error) {
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo);
                });
        }
        if(!newUser && user.email) {

            var auth = firebase.auth();
            auth.sendPasswordResetEmail(user.email)
            .then(res => {
            
            })
            .catch(error => {
            
            });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            
        }).catch(function (error) {
            
        });
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () => {

        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const userInfo = { ...user }
                userInfo.userName = displayName;
                userInfo.email = email;
                setUser(userInfo);
                history.replace(from);
            })
            .catch(error => {
                alert(error.message);
            })
    }

    const FBProvider = new firebase.auth.FacebookAuthProvider();
    const FBSignIn = () => {

        firebase.auth().signInWithPopup(FBProvider)
        .then(res => {
            var user = res.user;
            history.replace(from);
        })
        .catch(error => {
            var errorMessage = error.message;
        });
    }

    return (
        <>
            <NavbarWhite/>
            <div className="d-flex justify-content-center">
                <div>
                    <div className="login-form ">
                        <h5>{newUser ? 'Create an account' : 'Login'}</h5>
                        <form onSubmit={handleLogin}>

                            {newUser && <> <input onBlur={handleBlur} type="text" name="firstName" placeholder="First Name" required />
                                <br />

                                <input onBlur={handleBlur} type="text" name="lastName" placeholder="Last Name" required />
                                <br /> </>}

                            <input onBlur={handleBlur} type="text" name="email" placeholder={forgetPassword ? "Enter your email" : "Email"} required />
                            <br />

                            <input onBlur={handleBlur} type="password" name="password" placeholder={forgetPassword ? "Password you remember" : "Password"} required />
                            <br />
                            {!newUser && <p onClick={() => setForgetPassword(!forgetPassword)} className="forget-password">Forget password?</p>}

                            {newUser && <> <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm password" required />
                                <br />
                                <p style={{ color: "red", fontSize: "11px" }}>{passwordMatch.error}</p> </>}

                            {
                                forgetPassword ? <input type="submit" value="Send email"/> 
                                : <input type="submit" value={newUser ? "Create an account" : "Login"} />
                            }
                        </form>
                        <div style={{ textAlign: "center" }}>
                            <p className="have-an-account">{newUser && 'Already have an account?'}
                                <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create an account'}</button>
                            </p>
                            <p className="error">{user.error}</p>
                            {user.success && <p className="success">User {newUser ? 'created' : "logged in"} successfully</p>}
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: '13px' }}>or</p>
                        <button onClick={FBSignIn} className="continue-with-btn"><img src={fb} alt="" /> Continue with Facebook</button> <br />
                        <button onClick={googleSignIn} className="continue-with-btn"><img src={google} alt="" /> Continue with Google</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;