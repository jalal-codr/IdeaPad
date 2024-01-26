import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../../FirebaseConfig';
import { useEffect, useState } from 'react';
function Signup() {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [error, setError] = useState('');
    const signinClick = async () => {
        window.location.href = '/signin';
    };
    const googleSignup = async () => {
        try {
            await signInWithPopup(auth, provider);
            window.location.href = '/';
        }
        catch (err) {
            setError(err.message);
        }
    };
    const emailSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, pswd);
            // Redirect to dashboard or home page after successful sign-up
            // Or handle the new user data as needed
            window.location.href = '/';
        }
        catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already in use.');
            }
            else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            }
            else if (err.code === 'auth/weak-password') {
                setError('Password is too weak.');
            }
            else {
                // For other errors, use the default error message
                setError(err.message);
            }
        }
    };
    useEffect(() => {
        if (error !== "") {
            alert(error);
        }
        return;
    }, [error]);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "hero min-h-screen bg-base-200", children: _jsxs("div", { className: "hero-content flex-col lg:flex-row-reverse", children: [_jsxs("div", { className: "text-center lg:text-left", children: [_jsx("h1", { className: "text-5xl font-bold", children: "Signup now!" }), _jsx("p", { className: "py-6", children: "Creating an account gives you  the ability to store your notes on the cloud making them accesable on any of your decives with  just a signin away." })] }), _jsxs("div", { className: "card shrink-0 w-full max-w-sm shadow-2xl bg-base-100", children: [_jsx("div", { className: "signup_div", children: _jsx("button", { onClick: signinClick, className: "btn", children: "Signin" }) }), _jsxs("form", { className: "card-body", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Email" }) }), _jsx("input", { onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "email", className: "input input-bordered", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Password" }) }), _jsx("input", { onChange: (e) => setPswd(e.target.value), type: "password", placeholder: "password", className: "input input-bordered", required: true })] }), _jsx("div", { className: "form-control mt-6", children: _jsx("button", { onClick: emailSignUp, className: "btn btn-primary", children: "Signup" }) })] }), _jsx("div", { className: "google_signin", children: _jsx("button", { onClick: googleSignup, className: "btn btn-wide", children: "Sigin with google" }) })] })] }) }) }));
}
export default Signup;
