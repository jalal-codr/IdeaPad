import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { auth, provider } from '../../FirebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
function Signin() {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [error, setError] = useState('');
    const signupClick = async () => {
        window.location.href = '/signup';
    };
    const googleSignin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            window.location.href = '/';
        }
        catch (err) {
            setError(err.message);
        }
    };
    const emailAndPassword = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pswd);
            window.location.href = '/';
        }
        catch (err) {
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                setError('Incorrect email or password');
                console.log('invalid email');
            }
            else {
                // For other errors, use the default error message
                setError(err.message);
                console.log('other reasons');
            }
        }
    };
    useEffect(() => {
        if (error !== "") {
            alert(error);
        }
        return;
    }, [error]);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "hero min-h-screen bg-base-200", children: _jsx("div", { className: "hero-content flex-col lg:flex-row-reverse", children: _jsxs("div", { className: "card shrink-0 w-full max-w-sm shadow-2xl bg-base-100", children: [_jsx("div", { className: "signup_div", children: _jsx("button", { onClick: signupClick, className: "btn", children: "Signup" }) }), _jsxs("form", { onSubmit: emailAndPassword, className: "card-body", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Email" }) }), _jsx("input", { onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "email", className: "input input-bordered", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Password" }) }), _jsx("input", { onChange: (e) => setPswd(e.target.value), type: "password", placeholder: "password", className: "input input-bordered", required: true }), _jsx("label", { className: "label", children: _jsx("a", { href: "#", className: "label-text-alt link link-hover", children: "Forgot password?" }) })] }), _jsx("div", { className: "form-control mt-6", children: _jsx("button", { className: "btn btn-primary", children: "Login" }) })] }), _jsx("div", { className: "google_signin", children: _jsx("button", { onClick: googleSignin, className: "btn btn-wide", children: "Sigin with google" }) })] }) }) }) }));
}
export default Signin;
