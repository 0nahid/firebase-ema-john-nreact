import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useState } from 'react';
import firebaseConfig from "../../Firebase/firebase";
initializeApp(firebaseConfig)
const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }
    const handleSignOut = () => {
        signOut(auth).then(() => {
            const userSignedOut = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            setUser(userSignedOut);
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
    return (
        <div>
            {user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Log in with Google</button>}
            {
                user.isSignedIn &&
                <div>
                    <p> Welcome, {user.name} </p>
                    <p>email: {user.email}</p>
                    <img style={{ borderRadius: '50%' }} src={user.photo} alt={user.name} />
                </div>
            }
        </div>
    );
};

export default Login;