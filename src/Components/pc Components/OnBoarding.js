import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
function onboarding() {
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);
    const checkUser = () => {
        if (!user) {
            return (_jsx("button", { onClick: clickBtn, className: "btn btn-primary", children: "Get Started" }));
        }
    };
    const clickBtn = () => {
        window.location.href = '/signin';
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "hero min-h-screen", style: { backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }, children: [_jsx("div", { className: "hero-overlay bg-opacity-60" }), _jsx("div", { className: "hero-content text-center text-neutral-content", children: _jsxs("div", { className: "max-w-md", children: [_jsx("h1", { className: "mb-5 text-5xl font-bold", children: "Welcome to IdeaPad" }), _jsx("p", { className: "mb-5", children: "Your mobile, cloud-based notepad allows you to log in from anywhere on any of your devices and save that random idea that came to you. Work on your existing notes seamlessly across multiple devices, and have no worries about your progress being saved because IdeaPad has got your back. With a rich text interface, you can draft minimalist professional documents on the go or even take notes in class, conferences, or even in the field that you can revisit later on.." }), checkUser()] }) })] }) }));
}
export default onboarding;
