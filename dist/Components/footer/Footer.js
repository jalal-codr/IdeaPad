import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
import { useState } from "react";
function Footer() {
    const [user, setUser] = useState();
    const btnClick = async () => {
        window.location.href = '/signin';
    };
    const logOut = async () => {
        await signOut(auth);
    };
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const checkUser = () => {
        if (user) {
            return (_jsx("button", { onClick: logOut, className: "btn btn-wide", children: "Sign out" }));
        }
        else {
            return (_jsx("button", { onClick: btnClick, className: "btn btn-wide", children: "Signin" }));
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("footer", { className: "footer footer-center p-10 bg-base-200 text-base-content rounded", children: [_jsx("nav", { className: "grid grid-flow-col gap-4", children: checkUser() }), _jsx("aside", { children: _jsx("p", { children: " Copyright \u00A9 2024 - All right reserved" }) })] }) }));
}
export default Footer;
